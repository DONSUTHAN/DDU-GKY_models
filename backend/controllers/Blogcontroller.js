const Blog = require('/models/BlogModels')

const createBlog = async (req, res) => {
    const {
        title, description, author
    } = req.body //destructing - same name

    try {
        const newData = await new Blog
            ({
                title,
                description,
                author
            })
    
    await newData.save();
    res.status(200).json({img:createdsuccesfully,data:newdata})
    }
    catch(error){
        res.status(500).json({img:"server error"})
        
    }

}

module.exports = {createBlog}