const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const dictSequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, './db/ecdict.sqlite')
});

// schema detail : https://github.com/skywind3000/ECDICT#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F
const Dict = dictSequelize.define('Word', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sw: {
    type: Sequelize.STRING
  },
  word: {
    type: Sequelize.STRING
  },
  phonetic: {
    type: Sequelize.STRING
  },
  definition: {
    type: Sequelize.TEXT
  },
  translation: {
    type: Sequelize.TEXT
  },
  pos: {
    type: Sequelize.STRING
  },
  collins: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  oxford: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  tag: {
    type: Sequelize.STRING
  },
  bnc: {
    type: Sequelize.INTEGER,
    default: null,
  },
  frq: {
    type: Sequelize.INTEGER,
    default: null,
  },
  exchange: {
    type: Sequelize.TEXT
  },
  detail: {
    type: Sequelize.TEXT
  },
  audio: {
    type: Sequelize.TEXT
  }
}, {
    tableName: 'stardict',
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
  });


function _formatResult(words) {
  words.forEach(item => {
    item.definition = _split(item.definition, '\n');
    item.translation = _split(item.translation, '\n');
    item.exchange = _split(item.exchange, '/');
    item.pos = _split(item.pos, '/');
    item.tag = _split(item.tag, ' ');
  })
  return words;
}

function _split(attribute, char) {
  return attribute ? attribute.split(char) : [];
}

module.exports.search = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      const kw = keyword.trim();
      Dict.findAll({
        where: {
          word: kw,
        },
        raw: true
      }).then(words => {
        const result = _formatResult(words);
        resolve(result);
      })
    } catch (e) {
      reject(e);
    }
  })
}

module.exports.batchSearch = (kwdList) => {
  const whereObj = [];
  const finalResult = [];
  if (kwdList && Array.isArray(kwdList) && kwdList.length > 0) {
    kwdList.forEach(item => {
      whereObj.push({ word: item.trim() });
      finalResult.push({})
    })
    return new Promise((resolve, reject) => {
      try {

        Dict.findAll({
          where: {
            [Op.or]: whereObj
          },
          raw: true
        }).then(words => {
          const result = _formatResult(words);

          if (result && result.length) {
            const resMap = new Map();
            result.forEach(item => {
              resMap.set(item.word, item);
            })
            kwdList.forEach((item, index) => {
              finalResult[index] = resMap.get(item) || {};
            })
          }
          resolve(finalResult);
        })
      } catch (e) {
        reject(e);
      }
    })
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error('Query input is not an array  or is an empty array'));
    })
  }
}