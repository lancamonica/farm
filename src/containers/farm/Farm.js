import './Farm.scss';
import Footer from '../../components/footer/Footer';
import ActionButton from '../../components/button/ActionButton';
import GridItemList from '../../components/gridItemList/GridItemList';
import GridTitleList from '../../components/gridTitleList/GridTitleList';
import Modal from '../../components/modal/Modal';
import { useState } from 'react';

const lives = [
  {
    "_id": "5fa87303947db3002a070d56",
    "name": "afsdfasdfasdfasdf",
    "area": 55,
  },

  {
    "_id": "45544545454454545454",
    "name": "trouxa",
    "area": 5,
  }
]


function Farm() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Cadastro");

  function openModalNewFarm() {
    setIsOpenModal(true); 
    setTitleModal("Cadastro");
  }

  function openModalEditFarm() {
    setIsOpenModal(true); 
    setTitleModal("Editar");
  }

  function closeModal() {
    setIsOpenModal(false);
  }
  

  return (
    <div className="container-farm">
      <div className="container-farm-action">
        <h1>Gerenciamento de fazendas</h1>
        <ActionButton onClick={() => openModalNewFarm()} label={"Nova fazenda"}/>
      </div>
      <div className="farm-content">
        <GridTitleList titles={["Fazenda", "Área"]}>
            {
              lives.map(live => (
                <GridItemList
                  fields={[live.name, live.area]}
                  actions={
                    [
                      {
                        label: "Editar",
                        action: () => openModalEditFarm()
                      },
                      {
                        label: "Excluir",
                        action: () => alert(live.name)
                      },
                    ] 
                  }
                />
              ))
            }
          </GridTitleList>
        </div>  
      <Footer/>
      <Modal title={titleModal} isOpen={isOpenModal} actionCancel={() => closeModal()}>
        <h1>TESTE</h1>
      </Modal>
    </div>  
  );
}

export default Farm;
