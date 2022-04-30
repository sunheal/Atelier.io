import React from 'react';
import './css/Modal.css';

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
    const { onClose, comparisionArray } = this.props;
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
        <div className="modal-container">
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
        </div>
        <br></br>
        {/* <button onClick={onClose}> Close </button> */}
      </div>);
  }
};

export default Modal;