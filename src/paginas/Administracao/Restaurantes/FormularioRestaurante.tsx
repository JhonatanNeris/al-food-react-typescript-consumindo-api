import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'

import { Link as RouterLink } from 'react-router-dom'

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get(`restaurantes/${[params.id]}/`)
                .then(res => {
                    setNomeRestaurante(res.data.nome)
                })
        }
    }, [params])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })

        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
        }


    }
    return (
        <>           

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* Conteúdo da página */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 1 }}>
                            <Typography component='h1' variant='h6'>Formulário de restaurantes</Typography>
                            <Box component='form' sx={{width: '100%'}} onSubmit={handleSubmit}>
                                <TextField
                                    id="standard-basic"
                                    label="Nome do restaurante"
                                    variant="standard"
                                    required
                                    value={nomeRestaurante}
                                    onChange={(e) => setNomeRestaurante(e.target.value)}
                                    fullWidth
                                />
                                <Button sx={{ marginTop: 2 }} variant="outlined" type='submit' fullWidth>
                                    Cadastrar
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>


        </>
    )
}

export default FormularioRestaurante