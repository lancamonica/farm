import './Lot.scss';
import Footer from '../../components/footer/Footer';
import ActionButton from '../../components/button/ActionButton';
import GridItemList from '../../components/gridItemList/GridItemList';
import GridTitleList from '../../components/gridTitleList/GridTitleList';
import Modal from '../../components/modal/Modal';
import { useState } from 'react';
import { TextField } from 'material-ui';


const lives = [
  {
    "_id": "5fa87303947db3002a070d56",
    "name": "afsdfasdfasdfasdf",
    "area": 55,
    "cattle": 25
  },

  {
    "_id": "45544545454454545454",
    "name": "trouxa",
    "area": 5,
    "cattle": 30
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
    <div className="container-lot">
      <div className="container-farm-action">
        <h1>Lotes</h1>
        <ActionButton onClick={() => openModalNewFarm()} label={"Novo lote"}/>
      </div>
      <div className="farm-content">
        <GridTitleList items={4} titles={["Fazenda", "Lote", "Gados"]}>
            {
              lives.map(live => (
                <GridItemList
                  items={4}
                  fields={[live.name, live.area, live.cattle]}
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
        <div className="text-field-lot">
          <TextField
            autoComplete="off"
            name="name"
            hintText="Digite o nome"
            floatingLabelText="Nome"
            type="text"
            style={{
              width: '90%',
              marginRigth: 5
            }}
            onChange={(e) => {}}
          />

          <TextField
            autoComplete="off"
            name="name"
            hintText="Digite a quantidade de gados"
            floatingLabelText="Quantidade de gados"
            type="text"
            style={{
              width: '90%',
              marginLeft: 20
            }}
            onChange={(e) => {}}
          />
        </div>
      </Modal>
    </div>  
  );
}

export default Farm;
