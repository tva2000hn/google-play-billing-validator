var request = require('google-oauth-jwt').requestWithJWT();
var util = require('util');

var options = {
 email: "991915857973-compute@developer.gserviceaccount.com",
 key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCepYXAqPKw/2Vz\nFhkulO+F/Dck2iPS7eaYZ+fBMpBUNfyn5IJ4LinulAMLf3y6tHLEEuflOom0M3Ol\nTh8wgFEjDQVX8X7Aop5PjBWRiVcDMZvXl8U56vU3sIhOwqW+A3SpKgBtTRi24xFR\nqUZSXdxR36Q9AwlljPxbAMgZIabnf9RYheada3cU4L+rtK4lKqqw+3dXH9cdFTLY\nVj0hC/+Ir+nGU1ctJenFZhs+1JP6iFvtmltoZwbj1fAylXbjyIyGV/R/oUHhlVCr\nrnc48yYSfBg9q/GojtrN+AcwwPkoPLulbTNxYED1/EWS8SqrysJxVh7fVjFAo6Hr\nWSrrKg0fAgMBAAECggEAMUSFF5JAIDCIUGfF9T3ibrEnbOXjpy8jZCQsiEaMJOLJ\nLlicHfd0JTfJBEqYsSC13Wdjpb/6oMAzw1vR+s12pRR3mtqP+wHleR2vWw2UPJUs\n6RSkdrqdYaiMhC0VrL9E/P3iuQ7uxGka6UnQ4WZts+1og1wMkIFqo1ZITemx/AUs\nzs3YouTGZBId+CEWMbtGTFy6fwzWksun+LQOyHQtWkyWTOPn0unPTpH7SiBTSw1z\nZZ2r7GijxOJvLSWuzGUd5wNsS5dRaUX8FsWPhgP5ZM6MN52luLt3KG6QloUkZxD2\nhQOzl7WKwGCK159baWm+D9fur51zlni75L0YW5uKlQKBgQDVEXKh8fgicm5LcnZY\nu7osO09nhQ1nKK4yoDz6YSLLYpV003FmB04/XS5R+jSF2VC4D71br5Ku1Ng/4O3n\n9JTh074ZzqOLYauop6ay+7gq2txogLXG4Ev+v97a6KSWxocYzRB6TcfIgv/1N/uh\n+MsTdGBDd0xJuUnRl+mtQVINowKBgQC+nOHuOoRtXypmDq2D+QcJfgR5+/qOTFWb\npQ7SJ6A6D5n8rnqqQ9pEP2KV7ahITLdi0smG9oM/2FK2B0sYi987LT97Ravo6yzw\nfR0QcAclsm0wyID+9gGRJXDcxewo+L7HiuvLNxccAYNToUAfdzfqSZgCiw+ufK/J\nx31JvnLCVQKBgQCPT/ILzYY6HT/kjXPe0T4zHB2Xop3WQj2RHciGHKnbpU6jysje\neJF/+zv5tdJ4KSiq9SNHtTtzTwS5SqCawR8XGmYmU6AbUzGz+jgc8UT5xkY0IEak\nIx/alNHf6lUyeQxLeTrZGNIFI1/oX6RoWMC3MDLDjk2I1RE64fQyLdp0AwKBgQCa\ngcp1c8OScFiK34zw8/QrUpXIV2My41dlUbcgzHQJfEoC01+lElkjhwmfpEQLTvw7\nw8cNelbLcssgt+q8W+y4KCZUAxalN7R2v8PGZji06tutdmlxwfFlOScyHdEfKPpj\n/wzA7cfysJtGN+glWVres4bfUN+GPZW0htrc4t5c/QKBgDZXrWiJBweH522ytKlW\nNPTULPewR5d/0yXSEGZUH/uG4VeJMcHcJutJfXlm0Waa/VVpAgQE2/3kXC1wSVTB\nejXAq7ExKCgEI73o6SFRKKPWvbbpWbavw6VveaRwCIubCKo655KDUCJDgLIPnzCR\nnMHCMshhrggPbk9h/Bml2W9z\n-----END PRIVATE KEY-----\n"
}
let receipt = {
  packageName: "com.tk.lolirem.vapormusic",
  productId: "donate1",
  purchaseToken: "pjooagcmpdpbddohpgmfpjbe.AO-J1Ow5WmQwxnaEpBM8F7ONUoT9Xe8yJuppgrNbwPFY3e9JmzjMB15jnDzhwmGx-BKz-CaKbFnDrHRzn_9nSOG9eclya8Bvrdj7JmzWddYvguo20tKNs5pHQS_ixPcbz6DN2TvX1sFW"
};
module.exports = Verifier;

function Verifier(options) {
  this.options = options || {};
}

Verifier.prototype.verifyINAPP = function(receipt) {
  let urlPattern = "https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s";
  let finalUrl = util.format(urlPattern, encodeURIComponent(receipt.packageName), encodeURIComponent(receipt.productId), encodeURIComponent(receipt.purchaseToken));

  return this.verify(finalUrl)
};

Verifier.prototype.verifySub = function(receipt) {
  var urlPattern = "https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/subscriptions/%s/tokens/%s";
  var finalUrl = util.format(urlPattern, encodeURIComponent(receipt.packageName), encodeURIComponent(receipt.productId), encodeURIComponent(receipt.purchaseToken));

  return this.verify(finalUrl)
};


Verifier.prototype.verify = function(finalUrl){
  let options = {
    uri: finalUrl,
    jwt: {
      email: this.options.email,
      key: this.options.key,
      scopes: ['https://www.googleapis.com/auth/androidpublisher']
    }
  }

  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      let resultInfo = {}

      if (err) {
        // Google Auth Errors returns here
        let errBody = err.body
        let errorMessage
        if (errBody) {
          errorMessage = err.body.error_description
        }else {
          errorMessage = err
        }
        resultInfo.isSuccessful = false
        resultInfo.errorMessage = errorMessage

        reject(resultInfo);
      } else {
        let obj = JSON.parse(body);

        let statusCode = res.statusCode
        //console.log("statusCode: " + statusCode);

        if (res.statusCode === 200) {
          // All Good
          //console.log("All good!");

          resultInfo.isSuccessful = true
          resultInfo.errorMessage = null

          resultInfo.payload = obj

          resolve(resultInfo);

        } else {
          // Error
          let errorMessage = obj.error.message

          resultInfo.isSuccessful = false
          resultInfo.errorMessage = errorMessage

          //console.log(resultInfo);
          reject(resultInfo);
        }

      }
    });

  })
}
