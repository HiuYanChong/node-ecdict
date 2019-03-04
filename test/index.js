const assert = require('assert');
const { search, batchSearch } = require('../index');

describe('node-ecdict', () => {
  describe('search word', () => {
    it('should search word normally', () => {
      search('test')
        .then(result => {
          assert(result.length === 1);
        })
    });
  });

  describe('trim keyword', () => {
    it('should trim keyword', () => {
      const search1 = search('keyword');
      const search2 = search(' keyword   ');
      Promise.all([search1, search2])
        .then(values => {
          const res1 = values[0][0];
          const res2 = values[1][0];
          assert(res1.id && res2.id && res1.id === res2.id);
        })
    })
  })

  describe('search nothing', () => {
    it('search nothing normally', () => {
      search('')
        .then(result => {
          assert(result.length === 0);
        })
    });
  })

  describe('batch search', () => {
    it('search batch normally', () => {
      batchSearch(['flower', 'words', 'woishf', 'oq'])
        .then(result => {
          assert(result.length === 4);
        })
    });
  })


  describe('batch search with a word has no result', () => {
    it('search batch a word normally', () => {
      batchSearch(['woishf'])
        .then(result => {
          assert(result.length === 1);
        })
    });
  })

  describe('batch search without array', () => {
    it('search batch a word normally', () => {
      batchSearch({ a: 111 })
        .catch(e => {
          assert(e);
        })
    });
  })

  describe('batch search with a empty array', () => {
    it('search batch a word normally', () => {
      batchSearch([])
        .catch(e => {
          assert(e);
        })
    });
  })
})
