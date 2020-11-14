const { response, request } = require("express")
const express = require('express');
const mongoose = require('mongoose');
const Music = require('../models/Music');
const Album = require('../models/Album');

const getMusics = (request, response)=>{
    Music.find()
        .then((musics) => {
            response.status(200).json(musics);
        })
        .catch(err => next(err));
}

const criarMusica = (request, response)=>{
    let { name } = request.body

    const newMusic = new Music({
        name
      });
      newMusic.save()
      .then(() => {
        Music.findOneAndUpdate({ _id: newMusic._id }, { $push: { album: request.params.albumId} })
        .then(() => {
            Album.findOneAndUpdate({ _id: request.params.albumId }, { $push: { musics: newMusic._id} })
            .then(() => {
                response.status(201).json('new music created');
            })
            .catch((err) => {
                throw new Error(err, "erro gerado ao tentar salvar o id no array de musicas");
            });
        })
        .catch((err) => {
            throw new Error(err, "erro gerado ao tentar salvar o id nos albums ");
        });    
      })
      .catch(err => next(err, "erro gerado aoo tentar salvar a musica"));
}

const atualizarMusica = (request, response)=>{
    if (!mongoose.Types.ObjectId.isValid(request.params.musicId)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Music.findByIdAndUpdate(request.params.musicId, request.body)
        .then(() => {
            response.json({ message: ` ${request.params.musicId} is updated successfully.` });
        })
        .catch((err) => {
            response.json(err);
        });
}

const deletarMusica = (request, response)=>{
    const { musicId } = request.params
    
    Music.findByIdAndDelete(musicId)
        .then(() => {
            response.status(200).json('music deleted');
        })
        .catch((err) => {
            throw new Error(err);
        });
}

module.exports ={
    getMusics,
    criarMusica,
    deletarMusica,
    atualizarMusica,
}