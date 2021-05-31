import React from "react";

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
  }

  activatedEditMode = () => {
    // console.log(this.state)
    //метод setState изменияет стейт, передаем в него обьект у которого editMode true
    /// setState асинхронен, изменяет стейт не мгновенно, а кода-то потом.
    this.setState({ editMode: true })
    /* console.log(this.state)*/
  }

  deactivatedEditMode = () => {
    this.setState({ editMode: false })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (e) => { //event, узнаем какое новое значение input
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    console.log('render')
    return (
      <div>
        {!this.state.editMode &&
        <div>
          {/*span отображает глобальный state*/}
          <span onDoubleClick={this.activatedEditMode}>
                  {this.props.status || 'No status'}
                </span>
        </div>
        }
        {this.state.editMode &&
        <div>
          {/*onBlur срабатывает когда уходит фокус //input отображает локальный state*/}
          <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivatedEditMode} type="text"
                 value={this.state.status}/>
        </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;