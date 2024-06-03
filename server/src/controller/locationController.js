
const prisma = require("../prisma")

const locationController = {

    createLocation: async (req, res) => {
        try {
            const { name, description, exactLocation, cityId, distFromStn, longitude, latitude, iframe } = req.body;

            if (!name || !description || !exactLocation || !cityId) {
                return res.status(400).json({ msg: "Please fill all fields" })
            }

            const cityExists = await prisma.city.findUnique({
                where: {
                    id: cityId
                },
                include: {
                    locations: true, // Include existing locations of the city
                },
            })

            if (!cityExists) {
                return res.status(400).json({ msg: "City does not exist" })
            }

            const location = await prisma.location.create({
                data: {
                    name: name,
                    description: description,
                    exactLocation: exactLocation,
                    distFromStn: distFromStn,
                    longitude: longitude,
                    latitude: latitude,
                    iframe: iframe,
                    city: {
                        connect: {
                            id: cityId
                        }
                    }
                }
            })
            res.status(201).json({ location })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "Internal server error": error })
        }
    },

    getLocation: async (req, res) => {
        try {
            const { id } = req.params;

            const city = await prisma.city.findUnique({
                where: {
                    id: id,
                },
            });

            if (!city) {
                return res.status(404).json({ message: "City not found" });
            }

            const locations = await prisma.location.findMany({
                where: {
                    cityId: id
                }
            })
            res.status(200).json({ locations })
        } catch (error) {
            console.log(error)
            res.status(500).json({ "Internal server error": error })
        }
    },

    getLocationDetails: async (req, res) => {
        try {
            const { id } = req.params;

            const location = await prisma.location.findUnique({
                where: {
                    id: id,
                }
            })
            res.status(200).json({ location })
        } catch (error) {
            console.log(error)
            res.status(500).json({ "Internal server error": error })
        }
    },

    updateLocation: async (req, res) => {
        try {

            const { name, description, exactLocation, distFromStn, longitude, latitude,iframe } = req.body;
            if (!name, !description, !exactLocation) {
                return res.status(400).json({ msg: "Please fill all fields" })
            }

            const { id } = req.params;

            const location = await prisma.location.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    description: description,
                    exactLocation: exactLocation,
                    distFromStn: distFromStn,
                    longitude: longitude,
                    latitude: latitude,
                    iframe: iframe
                }
            })
            res.status(200).json({ location })
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
            console.log(error)
        }
    }

}

module.exports = locationController;