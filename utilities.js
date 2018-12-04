const random = require('random');

let alphabets = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var encode = function(url, visited) {
  let encodedString = getKey();
  while(visited.has(encodedString)) {
    encodedString = getKey();
  }
}

function getKey() {
  let encodedString = '';
  for(let i=0; i<alphabets.length; i++) {
      encodedString.append(
        alphabets.charAt(random.int(min = 0, max = alphabets.length)));
  }
  return encodedString;
}

public String getRand() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(alphabet.charAt(rand.nextInt(62)));
        }
        return sb.toString();
    }

    public String encode(String longUrl) {
        while (map.containsKey(key)) {
            key = getRand();
        }
        map.put(key, longUrl);
        return "http://tinyurl.com/" + key;
    }

    public String decode(String shortUrl) {
        return map.get(shortUrl.replace("http://tinyurl.com/", ""));
    }

modules.exports = {encode, string_decoder};
