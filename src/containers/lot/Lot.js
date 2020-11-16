// external 
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { useState, useEffect} from 'react';
import { TextField } from 'material-ui';
//internal
import Footer from '../../components/footer/Footer';
import ActionButton from '../../components/button/ActionButton';
import GridItemList from '../../components/gridItemList/GridItemList';
import GridTitleList from '../../components/gridTitleList/GridTitleList';
import Modal from '../../components/modal/Modal';
import { listLots, deleteLot, createLot, getByIdLot, updateLot } from '../../services/lot';
import { listFarms } from '../../services/farm';
// style
import './Lot.scss';


function Lot() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Cadastro");
  const [lots, setLots] = useState([]);
  const [farms, setFarms] = useState([]);
  const [selectFarm, setSelectFarm] = useState("");
  const [lotName, setLotName] = useState("");
  const [cattleQty, setCattleQty] = useState("");
  const [lotId, setLotEditId] = useState("");
  

  useEffect(() => {
    handleListFarms();
    handleListLot();
  }, [])

  async function handleListFarms() {
    const result = await listFarms()
    setFarms(result.data)
  }  

  async function handleListLot() {
    const result = await listLots()
    setLots(result.data)
  }  

  async function handleCreateLot() {
    const data = {
      farm: selectFarm,
      name: lotName,
      cattleQty: cattleQty
    }

    const result = await createLot(data)
    if(result.status === 200) {
      setIsOpenModal(false);
      setSelectFarm("");
      setLotName("");
      setCattleQty("");
      handleListLot();
    }else{
      alert("Erro ao inserir lote!");
    }
  }

  async function handleEditLot() {
    const data = {
      farm: selectFarm,
      name: lotName,
      cattleQty: cattleQty
    }

    const result = await updateLot(lotId, data);
    if(result.status === 200) {
      setIsOpenModal(false);
      setSelectFarm("");
      setLotName("");
      setCattleQty("");
      handleListLot();
    }else{
      alert("Erro ao editar lote!");
    }
  }

  function handleSubmitLot() {
    if(titleModal === "Cadastro") {
      handleCreateLot()
    }else {
      handleEditLot()
    }
  }


  function getFarmName(farmId) {
    const farmName = farms.find((farm => farm._id === farmId))
    if(farmName === undefined) return "Fazenda indefinida"
    return farmName.name;
  }

  function openModalNewLot() {
    setIsOpenModal(true); 
    setTitleModal("Cadastro");
  }

  async function openModalEditLot(lotId) {
    setIsOpenModal(true); 
    setTitleModal("Editar");

    const result = await getByIdLot(lotId);
    const resultData = result.data
    setLotEditId(resultData._id);
    setSelectFarm(resultData.farm);
    setLotName(resultData.name);
    setCattleQty(resultData.cattleQty);
  }

  function closeModal() {
    setIsOpenModal(false);
  }
  
  async function handleDeleteLot(id) {
    const result = await deleteLot(id);
    if(result.status === 200) {
      setIsOpenModal(false);
      handleListLot()
      alert("Lote excluido com sucesso!")
    }else{
      alert("Erro ao excluir lote!");
    }
  }

  return (
    <div className="container-lot">
      <div className="container-lot-action">
        <h1>Lotes</h1>
        <ActionButton onClick={() => openModalNewLot()} label={"Novo lote"}/>
      </div>
      <div className="lot-content">
        <GridTitleList items={4} titles={["Fazenda", "Lote", "Gados"]}>
            {
              lots.map(lot => (
                <GridItemList
                  items={4}
                  fields={[farms.length > 0 ? getFarmName(lot.farm) : null, lot.name, lot.cattleQty]}
                  actions={
                    [
                    {
                        label: "Editar",
                        action: () => openModalEditLot(lot._id)
                    },
                    {
                        label: "Excluir",
                        action: () => handleDeleteLot(lot._id)
                    },
                    ] 
                  }
                />
              ))
            }
          </GridTitleList>
        </div>  
      <Footer/>
      <Modal title={titleModal} isOpen={isOpenModal} actionCancel={() => closeModal()} actionSubmit={() => handleSubmitLot()}>
        <div className="text-field-lot">
          <SelectField
            floatingLabelText="Fazenda"
            value={selectFarm}
            onChange={(event, index, value) => setSelectFarm(value)}
          >
            {
              farms.map(farm => (
                <MenuItem value={farm._id} primaryText={farm.name} />
              ))
            }
          </SelectField>
          <TextField
            autoComplete="off"
            name="name"
            hintText="Digite o nome"
            floatingLabelText="Nome"
            type="text"
            value={lotName}
            style={{
              width: '70%',
              marginLeft: 20 
            }}
            onChange={(e) => setLotName(e.target.value)}
          />

          <TextField
            autoComplete="off"
            name="name"
            hintText="Digite a quantidade de gados"
            floatingLabelText="Quantidade de gados"
            type="text"
            value={cattleQty}
            style={{
              width: '90%',
              marginLeft: 20
            }}
            onChange={(e) => setCattleQty(e.target.value)}
          />
        </div>
      </Modal>
    </div>  
  );
}

export default Lot;
