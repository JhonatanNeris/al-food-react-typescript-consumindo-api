import React, { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import http from '../../../http'

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(res => {
                setRestaurantes(res.data)
            })
            .then(error => {
                console.log(error)
            })

    }, [])

    //No exemplo acima usamos a baseURL, por isso ficou http.get e na frente omiitimos a URL base, no exemplo a baixo eu mantive o axios.delete

    const excluir = (restauranteAhSerExcluido : IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
        .then(res => {
            console.log(res)
            setRestaurantes(restaurantes.filter((restaurante) => (
                restaurante.id !== restauranteAhSerExcluido.id

            )))
        })

    }




    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Restaurantes
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes