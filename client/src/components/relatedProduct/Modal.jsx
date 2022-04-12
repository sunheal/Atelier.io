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
  }

  render() {
    const { show, onClose, comparison, products } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div id="modal" onClick={onClose}>
        <table className="comparision">
          <caption> Comparing </caption>
          <thead>
            <tr>
              <th>{products.currentPage}</th>
              <th></th>
                <th>{products.selected}</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(comparison).map((feature, index) => (
                <tr key={index}>
                  <td>{comparison[feature].currentPage ? "\u2713" : '   '}</td>
                  <td className="characteristics">{feature}</td>
                  <td>{comparison[feature].selected ? "\u2713" : '   '}</td>
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