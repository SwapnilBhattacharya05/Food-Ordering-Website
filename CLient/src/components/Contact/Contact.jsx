import { Box, Button, TextField, Typography } from "@mui/material"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import "./Contact.css"
import { tokens, useMode } from "../Admin/theme"
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import FaxIcon from '@mui/icons-material/Fax';
import MarkunreadIcon from '@mui/icons-material/Markunread';
const Contact = () => {
  const [theme, colorMode] = useMode()
  const colors = tokens(theme.palette.mode)

  return (
    <>
      <Navbar />
      <Box className="contact-container">
        <Box className="contact-left">
          <Box className="contact-heading">
            Get in <span className="contact-highlight">Touch</span>
            <Box className="contact-subheading">
              Questions or feedback? We're here to help. Get in touch—we're committed to your satisfaction.
            </Box>
          </Box>
          <Box className="contact-form-container"
            component="form"
            autoComplete='off'
            sx={{
              '&.MuiTextField-root': {
                m: 1,
                width: '25ch'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: `${colors.greenAccent[500]} !important`,
                }
              },
              '& .Mui-focused fieldset': {
                borderColor: `${colors.greenAccent[500]} !important`,
              },
              ' & label': {
                color: `${colors.greenAccent[500]} !important`,
              },
              ' & label.Mui-focused': {
                color: `${colors.greenAccent[600]} !important`,
              },
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              type='text'
              id="contact-name"
              name="name"
              variant="outlined"
              placeholder="Name"
              label="Name"
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: 480,
              }}
            />
            <TextField
              type='email'
              id="contact-email"
              name="email"
              variant="outlined"
              label="Email"
              placeholder="example@gmail.com"
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: 480,
              }}
            />
            <TextField
              type='number'
              id="contact-phone"
              name="phone"
              variant="outlined"
              label="Phone"
              placeholder="100-100-1010"
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: 480,
              }}
            />
            <TextField
              type='text'
              id="contact-query"
              name="Query"
              placeholder="Enter your query"
              variant="outlined"
              multiline
              rows={3}
              required
              sx={{
                width: 480,
              }}
            />
            <Button variant="contained"
              id="contact-submit"
            >
              Send
            </Button>
            <Box className="contact-icon">
              <PhoneInTalkIcon fontSize="large" sx={{
                color: `${colors.greenAccent[500]}`
              }} />
              <Box className="contact-info">
                <span className="contact-info-title">PHONE</span>
                <Box className="contact-info-number">6234567890</Box>
              </Box>

              <FaxIcon fontSize="large" sx={{
                color: `${colors.greenAccent[500]}`
              }} />
              <Box className="contact-info">
                <span className="contact-info-title">FAX</span>
                <Box className="contact-info-number">0354321234</Box>
              </Box>

              <MarkunreadIcon fontSize="large" sx={{
                color: `${colors.greenAccent[500]}`
              }} />
              <Box className="contact-info">
                <span className="contact-info-title">Email</span>
                <Box className="contact-info-number">infofoodzie@gmail.com</Box>
              </Box>

            </Box>
          </Box>
        </Box>

        <Box className="contact-right">
          <Box className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460.7955107785612!2d88.31156443023897!3d22.490519030481636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027a6d20580d19%3A0xaea2dcdc78bf4d6d!2s12%2F3%2C%2012%2F3%2C%20Gopinagar%2C%20Behala%2C%20Kolkata%2C%20West%20Bengal%20700034!5e0!3m2!1sen!2sin!4v1715536553825!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              id="contact-map-iframe">
            </iframe>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
export default Contact
