import React, { Component } from 'react';
import fileSize from 'file-size';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FileBody extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired,
  }

  render() {
    const { file, states } = this.props;
    const fileState = states[file.uploadId];

    if (file.cl_mode === 'rename') {
      return (<div className="content">
        <div className="ui mini file-name-input input field">
          <input
          onChange={ this.handleTitleInput }
          ref={ (e) => { this.newNameInput = e; } }
          type="text" placeholder="输入新文件名"
          value={ file.cl_input_name }
          />
        </div>
      </div>);
    }

    let nameToDisplay = file.filename;

    if (file.filename > 19) {
      nameToDisplay = `${nameToDisplay.substring(0, 16)}...`;
    }
    return (
      <div className="content">
        <div className="small header">{nameToDisplay}</div>
        <div className="small extra meta">
          <span>{file.uploaded_at ? file.uploaded_at.substring(0, 10) : ''}</span>
          <span className="right floated time">
            <p>{ fileState ? (`${fileSize(fileState.uploaded).human('si')}/${fileSize(fileState.total).human('si')}`) :
              (`${fileSize(file.size).human('si')}`)}
            </p>
          </span>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  states: state.ass.toJSON().states,
});

export default connect(mapStateToProps)(FileBody);
