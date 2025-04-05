import React from 'react';
import {
  PasswordInput,
  Input,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TUser } from '../../../declarations/user';
import { useUpdateProfileMutation } from '../../api/profile';
import curStyle from './profile-form.module.css';

interface ProfileFormProps {
  user: TUser;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [updateProfile] = useUpdateProfileMutation();

  const handleUpdate = async (updatedUser: Partial<TUser>) => {
    try {
      await updateProfile(updatedUser).unwrap();
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <form className={curStyle.child_div}>
      <div className={curStyle.input_field}>
        <Input
          type="text"
          value={user.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate({ ...user, name: e.target.value })
          }
          placeholder="Имя"
          icon="EditIcon"
        />
      </div>
      <div className={curStyle.input_field}>
        <EmailInput
          name="email"
          size="default"
          placeholder="Логин"
          value={user.email}
          onChange={(e) => handleUpdate({ ...user, email: e.target.value })}
        />
      </div>
      <div className={curStyle.input_field}>
        <PasswordInput
          name="password"
          size="default"
          value=""
          icon="EditIcon"
          onChange={(e) => handleUpdate({ ...user, password: e.target.value })}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
