// external 
import { useState, useEffect } from 'react';
import { TextField } from 'material-ui';
// internal
import Footer from '../../components/footer/Footer';
import ActionButton from '../../components/button/ActionButton';
import GridItemList from '../../components/gridItemList/GridItemList';
import GridTitleList from '../../components/gridTitleList/GridTitleList';
import Modal from '../../components/modal/Modal';
import { createFarm, listFarms, getByIdFarm, updateFarm, deleteFarm } from '../../services/farm'
// style
import './Farm.scss';

function Farm() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Cadastro");
  const [farms, setFarms] = useState([]);
  const [nameFarm, setNameFarm] = useState("");
  const [areaFarm, setAreaFarm] = useState("");
  const [farmEditId, setFarmEditId] = useState("");

  useEffect(() => {
    handleListFarms();
  }, [])

  async function handleListFarms() {
    const result = await listFarms()
    setFarms(result.data)
  }  

  function openModalNewFarm() {
    setIsOpenModal(true); 
    setTitleModal("Cadastro");
  }

  async function openModalEditFarm(farmId) {
    setIsOpenModal(true); 
    setTitleModal("Editar");

    const result = await getByIdFarm(farmId);
    const resultData = result.data
    setFarmEditId(resultData._id);
    setNameFarm(resultData.name);
    setAreaFarm(resultData.area);
  }

  async function handleEditFarm() {
    const data = {
      name: nameFarm,
      area: areaFarm
    }

    const result = await updateFarm(farmEditId, data);
    if(result.status === 200) {
      setIsOpenModal(false);
      setNameFarm("");
      setAreaFarm("");
      handleListFarms()
    }else{
      alert("Erro ao editar fazenda!");
    }
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  async function handleCreateFarm() {
    const data = {
      name: nameFarm,
      area: areaFarm
    }

    const result = await createFarm(data)
    if(result.status === 200) {
      setIsOpenModal(false);
      setNameFarm("");
      setAreaFarm("");
      handleListFarms()
    }else{
      alert("Erro ao inserir fazenda!");
    }
  }

  function handleSubmitForm() {
    if(titleModal === "Cadastro") {
      handleCreateFarm()
    }else {
      handleEditFarm()
    }
  }

  async function handleDeleteFarm(id) {
    const result = await deleteFarm(id);
    if(result.status === 200) {
      setIsOpenModal(false);
      handleListFarms()
      alert("Fazenda excluida com sucesso!")
    }else{
      alert("Erro ao excluir fazenda!");
    }
  }
  

  return (
    <div className="container-farm">
      <div className="container-farm-action">
        <h1>Gerenciamento de fazendas</h1>
        <ActionButton onClick={() => openModalNewFarm()} label={"Nova fazenda"}/>
      </div>
      <div className="farm-content">
        <GridTitleList items={3} titles={["Fazenda", "Área"]}>
            {
              farms.map(farm => (
                <GridItemList
                  items={3}
                  fields={[farm.name, farm.area]}
                  actions={
                    [
                      {
                        label: "Editar",
                        action: () => openModalEditFarm(farm._id)
                      },
                      {
                        label: "Excluir",
                        action: () => handleDeleteFarm(farm._id)
                      },
                    ] 
                  }
                />
              ))
            }
          </GridTitleList>
        </div>  
      <Footer/>
      <Modal title={titleModal} isOpen={isOpenModal} actionCancel={() => closeModal()} actionSubmit={() => handleSubmitForm()}>
          <div className="text-field-farm">
            <TextField
              autoComplete="off"
              name="name"
              hintText="Digite o nome"
              floatingLabelText="Nome"
              type="text"
              value={nameFarm}
              style={{
                width: '90%',
                marginRigth: 5
              }}
              onChange={(e) => setNameFarm(e.target.value)}
            />

            <TextField
              autoComplete="off"
              name="name"
              hintText="Digite a área"
              floatingLabelText="Área"
              type="text"
              value={areaFarm}
              style={{
                width: '90%',
                marginLeft: 20
              }}
              onChange={(e) => setAreaFarm(e.target.value)}
            />
          </div>
      </Modal>
    </div>  
  );
}

export default Farm;
