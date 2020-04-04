# Shuttle One Developer API demo
### by [Ernest Pascual](https://github.com/ernestpascual)

### Description
Shows sample implementation of [Shuttle One Developer API](https://github.com/shuttle-one/Developer). For more info about shuttle one, you can go to their [website](https://shuttleone.io/)

---

### Installation
- Clone this repository
- `yarn `  
- `yarn start ` 

---

### Notes
- Check out your logs to see the exact response from the API server
- If you do topup rightaway after doing KYC, it might prevent you from doing so because the API returns
```
{
	"code" : 1,
	"data" : "KYC This wallet  first"
}
```
Wait for a while and try to top up again
- You might encounter CORS errors, i havent managed it here but I installed the Moesif CORS extension in Chrome
- The codebase interacts with Philippine Peso (PHP) you can do your own implementations as you wish :)