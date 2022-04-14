import React from 'react';

// characteristics: current page product vs selected product from the list
// characteristics (TABLE format)
// first coloumn - current product
// second coloumn - characteristics
// third coloumn - selected product
// one characteristic(fact or value) a row
// if true facts or values, display a checkmark. Otherwise, leave blank
// if table is too long, the table should be scrollable, PRODUCT NAME should remain fixed at top the list

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonFeatures: {
        feature1: { value1: null, value2: null }
      }
    }
  }

  render() {
    const { onClose, comparisionArray} = this.props;
    let commonFeatures = {};
    comparisionArray[0].features.forEach(item => {
      commonFeatures[item.feature] = {
        currentPage: item.value,
        selected: null
      }
    })
    comparisionArray[1].features.forEach(item => {
      if (commonFeatures[item.feature]) {
        commonFeatures[item.feature].selected = item.value;
      } else {
        commonFeatures[item.feature] = {
          currentPage: null,
          selected: item.value
        }
      }
    })

    return (
      <div id="modal" onClick={onClose}>
        <table className="comparision">
          <caption> Comparing </caption>
          <thead>
            <tr>
              <th>{comparisionArray[0].name}</th>
              <th></th>
                <th>{comparisionArray[1].name}</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(commonFeatures).map((feature, index) => (
                <tr key={index}>
                  <td>{commonFeatures[feature].currentPage ? "\u2713" : '   '}</td>
                  <td className="characteristics">{feature}</td>
                  <td>{commonFeatures[feature].selected ? "\u2713" : '   '}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <br></br>
        {/* <button onClick={onClose}> Close </button> */}
      </div>);
  }
};

export default Modal;