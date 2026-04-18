import { Fragment, useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc, addDoc, orderBy, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const statusFlow = ['pending', 'paid', 'shipped']


  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    let q;

    if (user.email === 'ivandeveloper99@gmail.com') {
      q = collection(db, 'orders');
    } else {
      q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(data);
    });
    return () => unsubscribe();
  }, []);

  const changeStatus = async (orderId, currentStatus, direction) => {
    try {
      const safeStatus = currentStatus || 'pending';
      const currentIndex = statusFlow.indexOf(safeStatus);
      if (currentIndex === -1) return;

      let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if(newIndex < 0 || newIndex >= statusFlow.length) return;
      const newStatus = statusFlow[newIndex];

      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus
      });

      const q = query(
        collection(db, 'user_orders'),
        where('orderId', '==', orderId)
      );

      const snapshot = await getDocs(q);

      snapshot.forEach(async (docSnap) => {
        await updateDoc(doc(db, 'user_orders', docSnap.id), {
          status: newStatus
        });
      });

    } catch (error) {
      alert('Error');
    }


  };

  const deleteOrder = async (order) => {
    try {
      await addDoc(collection(db, 'deleted_orders'), {
        ...order,
        deleteAt: new Date()
      });

      const orderRef = doc(db, 'orders', order.id);
      await deleteDoc(orderRef);

      if (selectedOrder?.id === order.id) {
        setSelectedOrder(null);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (selectedOrder) {
      const updatedOrder = orders.find(o => o.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder)
      }
    }
  }, [orders]);
  
  return (
    <Fragment>
      <div className='w-full px-10 py-10 flex justify-between relative'>
        <div className='flex-1 mr-5 overflow-x-auto rounded-3xl overflow-scroll no-scrollbar border border-gray-200'>
          <table className='min-w-full bg-white '>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Order ID</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Total</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Date</th>
                {auth.currentUser?.email === 'ivandeveloper99@gmail.com' && (
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {orders.map(order => (
                <tr key={order.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span 
                      onClick={() => setSelectedOrder(order)} 
                      className='cursor-pointer hover:text-purple-400 font-medium'
                    >
                      #{order.id.slice(0, 6)}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    ${order.total}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='bg-purple-200 px-3 py-1 rounded-full text-sm font-semibold'>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.createdAt?.seconds
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                      : new Date(order.createdAt).toLocaleDateString()  
                    }
                  </td>
                  {auth.currentUser?.email === 'ivandeveloper99@gmail.com' && (
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <button 
                        onClick={() => deleteOrder(order)} 
                        className='bg-pink-500 text-white px-3 py-3 rounded-lg text-xs hover:cursor-pointer hover:scale-90 transition-all'
                      >
                        <i className='fi fi-rr-trash flex justify-center items-center'></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className='text-center py-10 text-gray-500'>
              No orders found
            </div>
          )}
        </div>

        {selectedOrder && (
          <section className='bg-zinc-900 text-white w-96 rounded-3xl h-full'>
            <main className='flex justify-between px-6 py-4'>
              <h1 className='text-center font-bold text-lg'>Order Information</h1>
              <i onClick={() => setSelectedOrder(null)} className='fi fi-rr-cross flex justify-center items-center cursor-pointer hover:text-purple-400'></i>
            </main>
            <hr />
            <div className='px-6 py-4 overflow-y-auto h-70 no-scrollbar'>
              <h1 className='font-bold mb-2'>Items</h1>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className='bg-zinc-800 rounded-lg p-3 my-2'>
                  <h2 className='font-medium'>{item.title}</h2>
                  <span className='text-purple-300'>${item.price}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className='px-6 py-4'>
              <h1 className='font-bold'>Total:</h1>
              <span className='text-xl font-bold text-purple-300'>${selectedOrder.total}</span>
            </div>
            <hr />
            <div className='px-6 py-4 flex flex-col gap-3'>
              <h1 className='font-bold'>Status:</h1>
              <span className='font-bold capitalize text-purple-300'>
                {selectedOrder.status || 'pending'}
              </span>

              {auth.currentUser?.email === 'ivandeveloper99@gmail.com' && (
                <div className='flex gap-2 mt-2'>
                  <button onClick={() => changeStatus(selectedOrder.id, selectedOrder.status, 'prev')} className='bg-purple-600 px-4 py-2 rounded-lg text-white hover:cursor-pointer hover:scale-90 transition-all text-sm flex justify-center items-center gap-1'><i className='fi fi-rr-angle-left flex justify-center items-center'></i> Back Status</button>
                  <button onClick={() => changeStatus(selectedOrder.id, selectedOrder.status, 'next')} className='bg-purple-600 px-4 py-2 rounded-lg text-white hover:cursor-pointer hover:scale-90 transition-all text-sm flex justify-center items-center gap-1'>Next Status <i className='fi fi-rr-angle-right flex justify-center items-center'></i></button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </Fragment>
  );
}