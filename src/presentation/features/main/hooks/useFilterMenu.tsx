import {useState} from 'react';
import {Menu} from '../../../../domain/entities/User';
import {normalize} from '../../../helper/utils';

interface Props {
  menus: Menu[] | undefined;
}

export const useFilterMenu = ({menus}: Props) => {
  const [buscar, setBuscar] = useState<string>('');
  const [filterMenu, setFilterMenu] = useState<Menu[] | undefined>(menus);

  const handlerSearch = (value: string) => {
    setBuscar(value);

    const filter = menus?.filter(item => {
      const search = normalize(value);
      return (
        normalize(item.menu_nombre).includes(search) ||
        normalize(item.menu_codigo).includes(search)
      );
    });

    setFilterMenu(filter);
  };

  return {
    //* Propiedades
    buscar,
    filterMenu,

    //* Metodos
    handlerSearch,
  };
};
