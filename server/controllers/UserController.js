const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const pool = require('../database/connection');

const UserController = {
  registerUser: (req, res) => {
    const { name, email, gender, phone, password } = req.body;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      const user = new UserModel({
        name,
        email,
        gender,
        phone,
        password: hash,
        status: 'pending',
        date: new Date(),
      });

      pool.query('INSERT INTO users SET ?', user, (error, results) => {
        if (error) {
          console.error('Error registering user:', error);
          return res.status(500).json({ error: 'An error occurred' });
        }

        res.status(200).json({ message: 'User registered successfully' });
      });
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
      if (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'An error occurred' });
        }

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        let message;
        if (user.status === 'pending') {
          message = 'Your account is pending approval';
        } else if (user.status === 'active') {
          message = 'Your account is active';
        } else {
          message = 'Your account is de-active';
        }

        res.status(200).json({ message });
      });
    });
  },

  logoutUser: (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  },

  updateProfile: (req, res) => {
    const { userId, name, email, gender, phone } = req.body;
    pool.query(
      'UPDATE users SET name = ?, email = ?, gender = ?, phone = ? WHERE id = ?',
      [name, email, gender, phone, userId],
      (error, results) => {
        if (error) {
          console.error('Error updating profile:', error);
          return res.status(500).json({ error: 'An error occurred' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
      }
    );
  },

  changePassword: (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    pool.query('SELECT * FROM users WHERE id = ?', userId, (error, results) => {
      if (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0];
      bcrypt.compare(currentPassword, user.password, (err, passwordMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'An error occurred' });
        }

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        const saltRounds = 10;
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'An error occurred' });
          }
          pool.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hash, userId],
            (error, results) => {
              if (error) {
                console.error('Error changing password:', error);
                return res.status(500).json({ error: 'An error occurred' });
              }

              res.status(200).json({ message: 'Password changed successfully' });
            }
          );
        });
      });
    });
  },

  deleteAccount: (req, res) => {
    const userId = req.params.id;
    console.log(req.params)
    pool.query('DELETE FROM users WHERE id = ?', userId, (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }
     res.status(200).json({ message: 'Account deleted successfully' });
    });
  },
};

module.exports = UserController;
