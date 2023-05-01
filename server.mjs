import express from 'express';
const app = express()
import path from 'path';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import mongoose from'mongoose';
import User from './model/user.js';
import createBareServer from '@tomphttp/bare-server-node';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb+srv://static:EternalKash69@cluster1.78ugtc7.mongodb.net/?retryWrites=true&w=majority')

const bare = createBareServer('/bare/');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/public/proxy/index.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/index.js'));
});

app.get('/public/proxy/sw.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/sw.js'));
});

app.get('/public/proxy/uv/uv.config.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/uv/uv.config.js'));
});


app.get('/public/proxy/uv/uv.bundle.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/uv/uv.bundle.js'));
});


app.get('/public/proxy/uv/uv.sw.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/uv/uv.sw.js'));
});


app.get('/public/proxy/uv/uv.handler.js',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/uv/uv.handler.js'));
});

app.get('/dashboard/proxy/',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/proxy/'));
});

app.get('/signup',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/api/register.html'));
});

app.get('/login',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/api/login.html'));
});



app.get('/reset',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/api/change-password.html'));
});

app.get('/dashboard',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/dashboard.html'));
});

app.get('/dash404',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/dash-404.html'));
});

app.get('/dashv2',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/dashv2.html'));
});

app.get('/image.png',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/image.png'));
});

app.get('/css/dashboard.css',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/css/dashboard.css'));
});

app.get('/css/universal.css',function(req,res){      
    res.sendFile(path.join(__dirname,'./public/css/universal.css'));
});

app.get('/model/user/user.service',function(req,res){      
    res.sendFile(path.join(__dirname,'./model/user/user.service.js'));
});

app.get('/model/stripe/connect',function(req,res){      
    res.sendFile(path.join(__dirname,'./model/stripe/connect.js'));
});

app.post('/logout', async (req, res) => {
  localStorage.removeItem("token");
})

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { email, username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password/email' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
        email: user.email,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { email, username, password: plainTextPassword, billingID, plan, hasTrial, endDate, role } = req.body

	
  if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' })
	}
  if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
      email,
			username,
			password,
      billingID,
      plan,
      hasTrial,
      endDate,
      role
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

// Render Html File

app.listen("8080", () => {
  console.log(" STARTING...")
  console.log(` WWW1.SOLOPANEL.LOL IS RUNNING`)
})
