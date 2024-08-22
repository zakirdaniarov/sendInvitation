import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [invitationSent, setInvitationSent] = React.useState(false);
  const [invitedUsers, setInvitedUsers] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const onClickSendInvitation = () => {
    setInvitationSent(true);
  }

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if (invitedUsers.includes(id)) {
      setInvitedUsers(prev => prev.filter(_id => _id !==id));
    }
    else {
      setInvitedUsers(prev=>[...prev, id]);
    }
  };

  React.useEffect(()=>{
    setIsLoading(true);
    fetch('https://reqres.in/api/users')
    .then(obj=>obj.json()).then(json=>setUsers(json.data)).catch((err)=>{
      console.warn(err);
      alert("There is no data in this endpoint");
    }).finally(()=>setIsLoading(false))
    }, []);

    return (
      <div className="App">
        {invitationSent ? (<Success count={invitedUsers.length}/> ) : 
        (<Users isLoading={isLoading} 
        items={users}
        searchValue={searchValue}
        onClickSendInvitation={onClickSendInvitation}
        onChangeSearchValue={onChangeSearchValue}
        invitedUsers={invitedUsers}
        onClickInvite={onClickInvite}/>)}
      </div>
  );
}

export default App;
