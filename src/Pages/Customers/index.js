import React from 'react';
import './customers.css';
import Title from '../../Components/Title';
import Header from '../../Components/Header';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import firebase from '../../Services/FirebaseConnection';
import { toast } from 'react-toastify';

export default function Customers() {
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');


    async function handleAdd(e) {
        e.preventDefault();

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== '') {

            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia: nomeFantasia,
                    cnpj: cnpj,
                    endereco: endereco
                })
                .then(() => {
                    setNomeFantasia('');
                    setCnpj('');
                    setEndereco('');
                    toast.info('Empresa cadastrada com sucesso!');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Erro ao cadastrar a empresa!');

                })

        } else {
            toast.info('Todos os campos devem ser preenchidos!');
        }


    }

    return (
        <div>
            <Header />
            <div className='content container-fluid'>
                <Title name="Clientes">
                    <FiUser color='#000' size={25} />
                </Title>
                <div className='container'>
                    <form className='form-profile custumers' onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type='text' placeholder='nome da sua empresa' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type='text' placeholder='Seu CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereco</label>
                        <input type='text' placeholder='Endereço da Empresa' value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                        <button type='submit'>Cadastrar</button>
                    </form>

                </div>
            </div>
        </div>
    )
}


