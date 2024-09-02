import { AppBar, Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'

import { Link as RouterLink } from 'react-router-dom'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')

    const [imagem, setImagem] = useState<File | null>(null)

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get(`pratos/${[params.id]}/`)
                .then(res => {
                    setNomePrato(res.data.nome)
                })
        }
    }, [params])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(res => setTags(res.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(res => setRestaurantes(res.data))
    }, [])

    const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }

    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('tag', tag)
        if (imagem) {
            formData.append('imagem', imagem)
        }
        formData.append('descricao', descricao)
        formData.append('restaurante', restaurante)

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(res => {
                alert('Prato cadastrado com sucesso!')
                setNomePrato('')
                setTag('')
                setImagem(null)
                setDescricao('')
                setRestaurante('')
            })
            .catch(error => console.log(error))



        if (params.id) {
            http.put(`pratos/${params.id}/`, {
                nome: nomePrato
            })
                .then(() => {
                    alert('Prato atualizado com sucesso!')
                })

        } else {
            http.post("pratos/", {
                nome: nomePrato
            })
                .then(() => {
                    alert('Prato cadastrado com sucesso!')
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
                            <Typography component='h1' variant='h6'>Formulário de pratos</Typography>
                            <Box component='form' sx={{ width: '100%' }} onSubmit={handleSubmit}>
                                <TextField
                                    id="standard-basic"
                                    label="Nome do prato"
                                    variant="standard"
                                    required
                                    value={nomePrato}
                                    onChange={(e) => setNomePrato(e.target.value)}
                                    fullWidth
                                    margin='dense'
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Descrição do prato"
                                    variant="standard"
                                    required
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    fullWidth
                                    margin='dense'
                                />
                                <FormControl fullWidth margin='dense' required>
                                    <InputLabel id='select-tag'>
                                        Tag
                                    </InputLabel>
                                    <Select labelId='select-tag' value={tag} label='Tag' onChange={(e) => setTag(e.target.value)}>
                                        {tags.map((tag) => (
                                            <MenuItem value={tag.value} key={tag.id}>
                                                {tag.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin='dense' required>
                                    <InputLabel id='select-restaurante'>
                                        Restaurante
                                    </InputLabel>
                                    <Select labelId='select-restaurante' label='Restaurante' value={restaurante} onChange={(e) => setRestaurante(e.target.value)}>
                                        {restaurantes.map((restaurante) => (
                                            <MenuItem value={restaurante.id} key={restaurante.id}>
                                                {restaurante.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <input type="file" onChange={selecionarArquivo} />

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

export default FormularioPrato