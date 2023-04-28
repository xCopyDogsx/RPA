
function solveCaptcha(element,captchaBase64) {
    const apiKey="167fa96fcce8bf1aa349fea2c417792f";
    const captchaFormData = `key=${apiKey}&method=base64&body=${captchaBase64}&json=1&numeric=2`;
    const captchaOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: captchaFormData,
  };
  return fetch('https://2captcha.com/in.php', captchaOptions)
    .then(response => response.text())
    .then(responseText => {
      const captchaId = responseText.split('|')[1];
      const checkCaptchaOptions = {
        method: 'GET',
      };
      return fetch(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`, checkCaptchaOptions);
    })
    .then(response => response.json())
    .then(responseJson => {
      const captchaText = responseJson.request;
      console.log(`Captcha Text: ${captchaText}`);
      var inputCaptcha = document.querySelector('[name="ctl00$ContentPlaceHolder1$TextBox2"]');
      inputCaptcha.value = captchaText;
      return captchaText;
    })
    .catch(error => {
      console.error(error);
    });
}