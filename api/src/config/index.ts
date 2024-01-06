import * as dotenv from 'dotenv';
dotenv.config();

const config={
    app:{
        NAME:process.env.APP_NAME || 'api',
        ENV:process.env.NODE_ENV || 'dev',
        PORT:process.env.PORT || 5000,
        API_URL:process.env.API_URL || 'http://localhost:5000',
        MONGO_URI:process.env.MONGO_URI || "mongodb+srv://root:admin123@dbmongo.qcmmrxv.mongodb.net/?retryWrites=true&w=majority",
        
        FRONTEND_URL:process.env.FRONTEND_URL || 'http://localhost:3000',
        BACKEND_URL:process.env.BACKEND_URL || 'http://localhost:4000'
        
    },
    
    jwt:{
        SECRET:process.env.JWT_SECRET || "lfakjfslfkaslkdfjlksjfsfdskfjls",
        ISSUER:process.env.JWT_ISSUER || 'kosheli',
        TOKEN_TTL:process.env.JWT_TOKEN_TTL || "1d",
    },
    
    mail:{
        api_key:process.env.SENDER_API_KEY || "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"
    }
}

export default config;