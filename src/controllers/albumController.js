const { response, request } = require("express")
const express = require('express');
const mongoose = require('mongoose');

const Album = require('../models/Album');

const getAlbuns = (request, response)=>{
    Album.find()
        .then((albuns) => {
            response.status(200).json(albuns);
        })
        .catch(err => next(err));
}

const criarAlbum = (request, response)=>{
    let { name, description } = request.body

    const newAlbum = new Album({
        name,
        description,
      });
    newAlbum.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));
}


const atualizarAlbum = (request, response)=>{
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Album.findByIdAndUpdate(request.params.id, request.body)
        .then(() => {
            response.json({ message: ` ${request.params.id} is updated successfully.` });
        })
        .catch((err) => {
            response.json(err);
        });
}

const deletarAlbum = (request, response)=>{
    const { id } = request.params
    
    Album.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json(' album deleted');
        })
        .catch((err) => {
            throw new Error(err);
        });
}


module.exports ={
    getAlbuns,
    criarAlbum,
    deletarAlbum,
    atualizarAlbum,
}







