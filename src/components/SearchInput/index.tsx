import { observer } from 'mobx-react-lite';
import { IoMdSearch } from 'react-icons/io';

import { useStore } from '../../hooks/use-store';

import './index.scss';

/**
 * A Search box component
 */
const SearchInput = () => {
  const { userStore } = useStore();

  return (
    <div className="search-input" data-testid="search-input">
      <input
        type="text"
        placeholder="Search for a contact"
        {...userStore.contactsSearchString.toInput}
      />
      <IoMdSearch className="icon" size={16} />
    </div>
  );
};

export default observer(SearchInput);
