const axios = require('axios');

module.exports = {
    graphGet : async (req, res) => {
        let api_data = await axios.get("http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json")
        .catch((err) => {
            console.log("error",err)
            return res.status(500).json({message:"Something went wrong"}); 
        })
        let data = api_data.data[1];
        return res.json({data:data})
    },
}
