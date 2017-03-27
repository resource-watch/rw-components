import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Icon from '../../Icon';

export default class TableContent extends React.Component {

  getPageBounds() {
    const { pagination } = this.props;

    return {
      bottom: pagination.page * pagination.pageSize,
      top: (pagination.page * pagination.pageSize) + pagination.pageSize
    };
  }

  setIndividualActionPath(path, id) {
    return path.replace(':id', id);
  }

  render() {
    const { actions, columns, sort, rowSelection, individualActions } = this.props;
    const { bottom, top } = this.getPageBounds();

    let data = this.props.filteredData;

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length}>No results found</td>
          </tr>
        </tbody>
      );
    }

    /* Apply sorting to data */
    if (!isEmpty(sort)) {
      data = data.slice().sort((rowA, rowB) => {
        return rowA[sort.field].toString().toLowerCase() > rowB[sort.field].toString().toLowerCase() ? sort.value : (sort.value * -1);
      });
    }

    /* Apply pagination to data */
    data = data.slice(bottom, top);

    return (
      <tbody>
        {data.map((row, index) => {
          const selectedClass = classnames({ '-selected': rowSelection.includes(row.id) });
          return (
            <tr
              className={`${selectedClass}`}
              onClick={() => this.props.onToggleSelectedRow(row.id)}
              key={index}
            >
              {(actions.showable || actions.editable || actions.removable) &&
                <td>
                  {actions.removable &&
                    <button
                      onClick={(e) => {
                        e && e.stopPropagation();
                        this.props.onRowDelete(row.id);
                      }}
                    >
                      <Icon name="icon-cross" className="-small" />
                    </button>
                  }
                </td>
              }
              {columns.map((col, i) =>
                <td key={i}>{row[col.value]}</td>
              )}
              {individualActions.show && 
                individualActions.actions.map((ac, i) => (
                  <td key={i} className="individual-action"><a href={this.setIndividualActionPath(ac.path, row.id)}>{ac.name}</a></td>
                ))
              }
            </tr>
          );
        })}
      </tbody>
    );
  }
}

TableContent.propTypes = {
  actions: React.PropTypes.object,
  columns: React.PropTypes.array,
  filteredData: React.PropTypes.array,
  pagination: React.PropTypes.object,
  rowSelection: React.PropTypes.array,
  sort: React.PropTypes.object,
  // FUNCTIONS
  onRowDelete: React.PropTypes.func,
  onToggleSelectedRow: React.PropTypes.func
};

TableContent.defaultProps = {
  actions: {},
  columns: [],
  filteredData: [],
  pagination: {},
  rowSelection: [],
  sort: {},
  // FUNCTIONS
  onRowDelete: null,
  onToggleSelectedRow: null
};