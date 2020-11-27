const { expect } = require('chai');

const baseConfig = require('@dwp/eslint-config-base');
const eslintConfig = require('../../src/index');

const reduceByIdenticalNames = (running, current) => {
  if (!running.includes(current)) {
    running.push(current);
  }
  return running;
};

describe('@dwp/eslint-config-typescript', () => {
  describe('Extending the base @dwp/eslint-config-typescript linter', () => {
    const allBaseKeys = [];
    const getAllKeys = (basePath, currentObject) => {
      Object.keys(currentObject).forEach((key) => {
        if (currentObject[key] instanceof Object && !Array.isArray(currentObject[key])) {
          getAllKeys(`${basePath}.${key}`, currentObject[key]);
        } else {
          allBaseKeys.push(`${basePath}.${key}`);
        }
      });
    };
    Object.keys(baseConfig).forEach((key) => {
      if (baseConfig[key] instanceof Object && !Array.isArray(baseConfig[key])) {
        getAllKeys(key, baseConfig[key]);
      } else {
        allBaseKeys.push(key);
      }
    });

    const lookupSplitValue = (key, baseObject) => {
      const partials = key.split('.');
      let obj = baseObject;
      partials.forEach((partialKey) => {
        obj = obj[partialKey];
      });
      return obj;
    };

    allBaseKeys.forEach((key) => {
      it(`should extend the ${key} key from the base config`, () => {
        // eslint-disable-next-line no-unused-expressions
        expect(lookupSplitValue(key, eslintConfig)).to.not.be.undefined;
      });
    });
  });

  it('the entrypoint should export an object', () => {
    expect(eslintConfig).to.be.an('Object');
  });

  describe('the exported object', () => {
    const eslintConfigKeys = Object.keys(eslintConfig);

    it('should have a parser key', () => {
      expect(eslintConfigKeys).to.contain('parser');
    });

    it('should have a plugins key', () => {
      expect(eslintConfigKeys).to.contain('plugins');
    });

    it('should have a rules key', () => {
      expect(eslintConfigKeys).to.contain('rules');
    });

    it('should have a settings key', () => {
      expect(eslintConfigKeys).to.contain('settings');
    });

    it('not have any other keys', () => {
      expect(eslintConfigKeys).to.deep.equal([
        ...Object.keys(baseConfig),
        'parser', 'plugins', 'rules', 'settings',
      ].reduce(reduceByIdenticalNames, []));
    });

    describe('the parser key should', () => {
      const rule = eslintConfig.parser;

      it('be typescript', () => {
        expect(rule).to.equal('@typescript-eslint/parser');
      });
    });

    describe('the plugins key should', () => {
      const rule = eslintConfig.plugins;

      it('contain typescript as a plugin', () => {
        expect(rule).to.contain('@typescript-eslint');
      });
    });

    describe('the settings key should', () => {
      const rule = eslintConfig.settings;

      it('be an object', () => {
        expect(rule).to.be.an('Object');
      });

      it('have an import/resolver key', () => {
        expect(Object.keys(rule)).to.contain('import/resolver');
      });

      it('not have any other keys', () => {
        expect(Object.keys(rule)).to.deep.equal(['import/resolver']);
      });

      describe('the import/resolver key should', () => {
        it('allow imports for all typescript and javascript files', () => {
          expect(rule['import/resolver']).to.deep.equal({
            node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
          });
        });
      });
    });

    describe('the rules key should', () => {
      const { rules } = eslintConfig;

      it('be an object', () => {
        expect(rules).to.be.an('Object');
      });

      it('have a brace-style key', () => {
        expect(Object.keys(rules)).to.contain('brace-style');
      });

      it('have a curly key', () => {
        expect(Object.keys(rules)).to.contain('curly');
      });

      it('have an indent key', () => {
        expect(Object.keys(rules)).to.contain('indent');
      });

      it('have a no-plusplus key', () => {
        expect(Object.keys(rules)).to.contain('no-plusplus');
      });

      it('have a semi key', () => {
        expect(Object.keys(rules)).to.contain('semi');
      });

      it('should not have any other keys', () => {
        expect(Object.keys(rules)).to.deep.equal([
          ...Object.keys(baseConfig.rules),
          'brace-style', 'indent', 'no-unused-vars',
          'no-shadow', 'semi',
          '@typescript-eslint/brace-style',
          '@typescript-eslint/indent',
          '@typescript-eslint/no-unused-vars',
          '@typescript-eslint/no-shadow',
          '@typescript-eslint/semi',
        ].reduce(reduceByIdenticalNames, []));
      });

      describe('the brace-style key should', () => {
        const rule = rules['brace-style'];

        it('be off', () => {
          expect(rule).to.equal('off');
        });
      });

      describe('the @typescript-eslint/brace-style key should', () => {
        const rule = rules['@typescript-eslint/brace-style'];

        it('equal the base rule', () => {
          expect(rule).to.deep.equal(baseConfig.rules['brace-style']);
        });
      });

      describe('the indent key should', () => {
        const rule = rules.indent;

        it('be off', () => {
          expect(rule).to.equal('off');
        });
      });

      describe('the @typescript-eslint/indent key should', () => {
        const rule = rules['@typescript-eslint/indent'];

        it('equal the base rule', () => {
          expect(rule).to.deep.equal(baseConfig.rules.indent);
        });
      });

      describe('the semi key should', () => {
        const rule = rules.semi;

        it('be off', () => {
          expect(rule).to.equal('off');
        });
      });

      describe('the @typescript-eslint/semi key should', () => {
        const rule = rules['@typescript-eslint/semi'];

        it('equal the base rule', () => {
          expect(rule).to.deep.equal(baseConfig.rules.semi);
        });
      });

      describe('the no-shadow key should', () => {
        const rule = rules['no-shadow'];

        it('be off', () => {
          expect(rule).to.equal('off');
        });
      });

      describe('the @typescript-eslint/no-shadow key should', () => {
        const rule = rules['@typescript-eslint/no-shadow'];

        it('raise an error', () => {
          expect(rule[0]).to.equal('error');
        });

        it('and not do anything else', () => {
          expect(rule).to.deep.equal(['error']);
        });
      });

      describe('the no-unused-vars key should', () => {
        const rule = rules['no-unused-vars'];

        it('be off', () => {
          expect(rule).to.equal('off');
        });
      });

      describe('the @typescript-eslint/no-unused-vars key should', () => {
        const rule = rules['@typescript-eslint/no-unused-vars'];

        it('raise an error', () => {
          expect(rule[0]).to.equal('error');
        });

        it('and not do anything else', () => {
          expect(rule).to.deep.equal(['error']);
        });
      });
    });
  });
});
