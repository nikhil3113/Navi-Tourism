const express = require('express');
const prisma = require("../prisma")

const cityController = {
    createCity : async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ msg: "Please fill all fields" })
        }

        const city = await prisma.city.create({
            data: {
                name: name,
                description: description,
            }
        })
        res.status(201).json({ city })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Internal server error": error })
    }
    
},

    deleteCity: async(req,res)=>{
        try {
            const {id} = req.params;
            const city  = await prisma.city.deleteMany({
                where:{
                    id: id
                }
            })
            res.status(200).json({city})
        } catch (error) {
            console.log(error)
            res.status(500).json({ "Internal server error": error })
        }
    },

    getAllCity: async(req,res)=>{
        try {
            const city = await prisma.city.findMany({
                include:{
                    locations:true
                }
            });
            const citiesCount = city.length;
            res.status(200).json({city, count: citiesCount})
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
        }
    },

    updateCity: async(req,res)=>{
        try {
            const {name ,description} = req.body;
            if (!name || !description) {
                return res.status(400).json({ msg: "Please fill all fields" })
            }
            const {id} =req.params;
            const city = await prisma.city.update({
                where:{
                    id:id
                },
                data:{
                    name:name,
                    description:description
                }
            })
            res.status(200).json({city})
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
        }
    },

    getCityById: async(req, res) => {
        try {
            const {id} = req.params;
            const city =await prisma.city.findUnique({
                where:{
                    id:id
                }
            })
            res.status(200).json({city})
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
            console.log(error)
        }
    }
}

module.exports = cityController 