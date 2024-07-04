import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AnaliseAtividade.css';
import firebase from '../../firebase/firebaseConfig';


const AnaliseAtividade = () => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState();
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && hours && category && date) {
      setError(false);
      setErrorMsg('');

      try {
        firebase.firestore().collection("atividades").add({
          description,
          hours,
          category,
          date,
          file
      });
      } catch (err) {
        setError(true);
        setErrorMsg(err.message);
      }
    }
    // Handle form submission logic here
    console.log({
      description,
      hours,
      category,
      date,
      file
    });
  };

  return (
    <div className="activity-form-container">
      <form className="activity-form" onSubmit={handleSubmit}>
        <div className='inputs'>
          <h2>Análise de Atividade</h2>

          <div className="input">
            <input
              type="text"
              placeholder="Carga Horária"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              disabled
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Categoria Atividade"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Data da Atividade"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="input">
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <input
            type="file"
            id="file"
            accept=".pdf, image/*"
            onChange={handleFileChange}
          />
          {error && <div className="error">{errorMsg}</div>}
        </div>



        <button type="submit">Enviar</button>
      </form>
    </div>

  );
};

export default AnaliseAtividade;
