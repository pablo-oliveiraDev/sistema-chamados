import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import './new.css';
import { AuthContext } from '../../Contexts/Auth';
import firebase from '../../Services/FirebaseConnection';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';

export default function New() {
    const { id } = useParams();
    const history = useHistory();



    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);


    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const { user } = useContext(AuthContext);
    const [idCustumer, setIdCustumer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia,

                        })
                    })

                    if (lista.length === 0) {
                        console.log('Nenhuma empresa encontrada!');
                        setCustomers([{ id: 1, nomeFantasia: 'Freela' }]);
                        setLoadCustomers(false)
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);

                    if (id) {
                        loadId(lista);

                    }

                })
                .catch((error) => {
                    console.log('Deu algum erro!');
                    setLoadCustomers(false);
                    setCustomers([{ id: 1, nomeFantasia: '' }])
                })

        }
        loadCustomers();

    }, [id]);

    async function loadId(lista) {
        await firebase.firestore().collection('chamados').doc(id)
            .get()
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto);
                setStatus(snapshot.data().status);
                setComplemento(snapshot.data().complemento);

                let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
                setCustomerSelected(index)
                setIdCustumer(true);
            })
            .catch((err) => {
                console.log('ERRO NO ID PASSADO :', err);
                setIdCustumer(false)
            })
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustumer) {
            await firebase.firestore().collection('chamados').doc(id)
                .update({

                    cliente: customers[customerSelected].nomeFantasia,
                    clienteId: customers[customerSelected].id,
                    assunto: assunto,
                    status: status,
                    complemento: complemento,
                    userId: user.uid
                })
                .then(() => {
                    toast.success('Chamado editado com sucesso!');
                    setComplemento('');
                    setCustomerSelected(0);
                    history.push('/dashboard');

                }).catch((err) => {
                    toast.error('Ops erro ao editar o registro ,tente mais tarde!');
                    console.log(err)
                })
            return;
        }

        await firebase.firestore().collection('chamados')
            .add({
                create: new Date(),
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado criado com sucesso!');
                setComplemento('');
                setCustomerSelected(0);

            })
            .catch((err) => {
                toast.error('Ops erro ao registrar, tente mais tarde.')

            })


    }
    //chamado qndo troca o assunto 
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }
    //chamado qndo troca de status
    function handleOptionChange(e) {
        setStatus(e.target.value);
    }
    //chamado qndo troca de cliente
    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value);

    }

    return (
        <div>
            <Header />
            <div className='content container-fluid' >
                <Title name='Novo Chamado'>
                    <FiPlusCircle size={25} />
                </Title>
                <div className='container' >
                    <form className='form-profile' onSubmit={handleRegister} >
                        <label>Cliente</label>
                        {loadCustomers ? (
                            <input type='text' disabled={true} value='Carregando clientes...' />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index} >
                                            {item.nomeFantasia}
                                        </option>)

                                })}

                            </select>

                        )}


                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='suporte' > Suporte</option>
                            <option value='visita Tecnica' > Visita Tecnica</option>
                            <option value='financeiro' > Financeiro</option>
                        </select>

                        <div className='status'>
                            <input
                                type='radio'
                                name='radio'
                                value='Aberto'
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type='radio'
                                name='radio'
                                value='progresso'
                                onChange={handleOptionChange}
                                checked={status === 'progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type='radio'
                                name='radio'
                                value='Atendido'
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>
                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva seu problema(Opcional).'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}

                        />

                        <button type='submit'>Registrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
