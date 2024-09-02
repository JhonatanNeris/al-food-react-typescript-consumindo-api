import React, { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(res => {
                setPratos(res.data)
            })
            .then(error => {
                console.log(error)
            })

    }, [])

    //No exemplo acima usamos a baseURL, por isso ficou http.get e na frente omiitimos a URL base, no exemplo a baixo eu mantive o axios.delete

    const excluir = (pratoAhSerExcluido : IPrato) => {
        axios.delete(`http://localhost:8000/api/v2/pratos/${pratoAhSerExcluido.id}/`)
        .then(res => {
            console.log(res)
            setPratos(pratos.filter((prato) => (
                prato.id !== pratoAhSerExcluido.id

            )))
        })

    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Pratos
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noopener noreferrer">Ver imagem</a>
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(prato)}>
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

export default AdministracaoPratos