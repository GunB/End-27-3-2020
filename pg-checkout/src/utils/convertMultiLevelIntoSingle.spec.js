import { convertMultiLevelIntoSingle, convertMultiLevelIntoSingleArray, convertMultiLevelIntoArrayKeySingleObject, updateDataSingleLvlIntoMulti, multiUpdateSingleMulti } from "./convertMultiLevelIntoSingle";


describe('Object Formatter', () => {
  it('Given a complex object is turned into a single lvl object with all the Keys combined', () => {
    const multilvlObject = {
      "hello": {
        extraplanar: new Date(0),
        "magic": {
          "play": 'Gullar',
          "something": {
            "more of it": true
          },
          monster: 8
        }
      }
    }

    const expected = [
      { value: new Date(0), key: "hello-extraplanar" },
      { value: 'Gullar', key: "hello-magic-play" },
      { value: true, key: "hello-magic-something-more of it" },
      { value: 8, key: "hello-magic-monster" }
    ]

    expect(convertMultiLevelIntoSingleArray(multilvlObject)).toEqual(expected);
  });
  it('Given a complex object is turned into a single lvl array of objects with all the Keys combined', () => {
    const multilvlObject = {
      "hello": {
        extraplanar: new Date(0),
        "magic": {
          "play": 'Gullar',
          "something": {
            "more of it": true
          },
          monster: 8
        }
      }
    }

    const expected = {
      "hello-extraplanar": new Date(0),
      "hello-magic-play": 'Gullar',
      "hello-magic-something-more of it": true,
      "hello-magic-monster": 8,
    }

    expect(convertMultiLevelIntoSingle(multilvlObject)).toEqual(expected);
  })
  it("Given a complex object, turn it into single lvl key value object", () => {
    const given = {
      "user": {
        "name": {
          "value": "Prueba",
          "editable": true,
          "type": "text"
        },
        "email": {
          "value": "test@paymentez.com",
          "editable": true,
          "type": "text"
        }
      },
      "order": {
        value: new Date(0),
        editable: false,
        type: "date"
      }
    }

    const expected = [{
      "key": "user-name",
      "keys": [
        "user",
        "name"
      ],
      "value": {
        "editable": true,
        "type": "text",
        "value": "Prueba"
      }
    },
    {
      "key": "user-email",
      "keys": [
        "user",
        "email"
      ],
      "value": {
        "editable": true,
        "type": "text",
        "value": "test@paymentez.com"
      }
    },
    {
      "key": "order",
      "keys": [
        "order"
      ],
      "value": {
        "editable": false,
        "type": "date",
        "value": new Date(0)
      }
    }]

    expect(convertMultiLevelIntoArrayKeySingleObject(given)).toEqual(expected);

  })
  it('Given a simple object transformed from convertMultiLevelIntoSingleArray, should change the value correctly into the original elelemnt', () => {
    const original = {
      "user": {
        "name": {
          "value": "Prueba",
          "editable": true,
          "type": "text"
        },
        "email": {
          "value": "test@paymentez.com",
          "editable": true,
          "type": "text"
        }
      },
      "order": {
        value: new Date(0),
        editable: false,
        type: "date"
      }
    }

    const expected = {
      "user": {
        "name": {
          "value": "TEST",
          "editable": true,
          "type": "text"
        },
        "email": {
          "value": "test@paymentez.com",
          "editable": true,
          "type": "text"
        }
      },
      "order": {
        value: new Date(0),
        editable: false,
        type: "date"
      }
    }

    expect(updateDataSingleLvlIntoMulti({ key: "user-name", value: "TEST" }, original, false)).toEqual(expected);
  })
  it('Given a simple object transformed from convertMultiLevelIntoSingleArray, should change ALL values correctly into the original elelemnt', () => {
    const original = {
      "user": {
        "name": {
          "value": "Prueba",
          "editable": true,
          "type": "text"
        },
        "email": {
          "value": "test@paymentez.com",
          "editable": true,
          "type": "text"
        }
      },
      "order": {
        value: new Date(0),
        editable: false,
        type: "date"
      }
    }
    const expected = {
      "user": {
        "name": {
          "value": "TEST",
          "editable": true,
          "type": "text"
        },
        "email": {
          "value": "LUCKY",
          "editable": true,
          "type": "text"
        }
      },
      "order": {
        value: new Date(0),
        editable: false,
        type: "date"
      }
    }

    expect(multiUpdateSingleMulti({
      "user-name": "TEST",
      "user-email": "LUCKY"
    }, original, false)).toEqual(expected);
  })
});
