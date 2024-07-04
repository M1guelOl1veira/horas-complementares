import firebase from '../../firebase/firebaseConfig';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = firebase.firestore().collection('atividades');
        const data = await response.get();
        const activitiesArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivities(activitiesArray);
      } catch (error) {
        console.error("Erro ao buscar atividades: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Lista de Atividades</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Descrição</th>
            <th>Aluno</th>
            <th>Data</th>
            <th>Carga Horária</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.description}</td>
              <td>{activity.student}</td>
              <td>{activity.date}</td>
              <td>{activity.hours}</td>
              <td className="text-center">
                <button className="btn btn-primary btn-sm">
                  Analisar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList;