import axios from "axios";

export default class DriverController {
  search = (req, res) => {
    const latitude = req.query.latitude
    const longitude = req.query.longitude
    const count = req.query.count

    if (!latitude || !longitude || !count) {
      res.status(400).json('Parameter is wrong')
    }

    axios({
      method: 'get',
      url: `https://qa-interview-test.splytech.dev/api/drivers?latitude=${latitude}&longitude=${longitude}&count=${count}`,
      responseType: 'json'
    }).then(function (response) {
      res.status(200).json(response.data);
    }).catch(function (err) {
      res.status(500).json(err)
    });
  }
}
