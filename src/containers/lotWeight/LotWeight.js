// external 
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { useState, useEffect} from 'react';
import { TextField } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
//internal
import Footer from '../../components/footer/Footer';
import ActionButton from '../../components/button/ActionButton';
import GridItemList from '../../components/gridItemList/GridItemList';
import GridTitleList from '../../components/gridTitleList/GridTitleList';
import Modal from '../../components/modal/Modal';
import { listLots} from '../../services/lot';
import { createLotWeight, listLotsWeight, deleteLotWeight, getByIdLotWeight, updateLotWeight } from '../../services/lotWeight';
// style
import './LotWeight.scss';
import moment from 'moment';

function Farm() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Cadastro");
  const [lotsWeight, setLotsWeight] = useState([]);
  const [lots, setLots] = useState([]);
  const [selectLot, setSelectLot] = useState("");
  const [cattleQty, setCattleQty] = useState("");
  const [cattleWeight, setCattleWeight] = useState("");
  const [weightId, setWeightId] = useState("");
  const [date, setDate] = useState("");
  

  useEffect(() => {
    handleListLots();
    handleListCattle();
  }, [])


  async function handleListLots() {
    const result = await listLots()
    setLots(result.data)
  }  

  async function handleListCattle() {
    const result = await listLotsWeight()
    setLotsWeight(result.data)
  }  

  async function handleCreateLotWeight() {
    const data = {
      farmLot: selectLot,
      cattleQty: cattleQty,
      cattleWeight: cattleWeight,
      date: date,
    }

    const result = await createLotWeight(data)
    console.log(result)
    if(result.status === 200) {
      setIsOpenModal(false);
      setSelectLot("");
      setCattleQty("");
      setCattleWeight("");
      setDate("");
      handleListCattle();
    }else{
      alert("Erro ao inserir pesagem!");
    }
  }

  async function handleEditWeight() {
    const data = {
      farmLot: selectLot,
      cattleQty: cattleQty,
      cattleWeight: cattleWeight,
      date: date,
    }

    const result = await updateLotWeight(weightId, data);
    if(result.status === 200) {
      setIsOpenModal(false);
      setSelectLot("");
      setCattleQty("");
      setCattleWeight("");
      setDate("");
      handleListCattle();
    }else{
      alert("Erro ao editar pesagem!");
    }
  }

  function handleSubmitWeight() {
    if(titleModal === "Cadastro") {
      handleCreateLotWeight()
    }else {
      handleEditWeight()
    }
  }


  function getLotName(lotId) {
    const lotName = lots.find((lot => lot._id === lotId))
    if(lotName === undefined) return "Lote indefinido"
    return lotName.name;
  }

  function openModalNewWeight() {
    setIsOpenModal(true); 
    setTitleModal("Cadastro");
  }

  async function openModalEditWeight(lotWeightId) {
    setIsOpenModal(true); 
    setTitleModal("Editar");

    const result = await getByIdLotWeight(lotWeightId);
    const resultData = result.data
    setWeightId(resultData._id);
    setSelectLot(resultData.farmLot);
    setCattleQty(resultData.cattleQty);
    setCattleWeight(resultData.cattleWeight);
    setDate(new Date(resultData.date));
  }

  function closeModal() {
    setIsOpenModal(false);
  }
  
  async function handleDeleteWeight(id) {
    const result = await deleteLotWeight(id);
    if(result.status === 200) {
      setIsOpenModal(false);
      handleListCattle()
      alert("Pesagem excluida com sucesso!")
    }else{
      alert("Erro ao excluir pesagem!");
    }
  }

  return (
    <div className="container-weight">
      <div className="container-weight-action">
        <h1>Pesagem</h1>
        <ActionButton onClick={() => openModalNewWeight()} label={"Nova pesagem"}/>
      </div>
      <div className="weight-content">
        <GridTitleList items={4} titles={["Lote", "Gados", "Peso dos gados"]}>
            {
              lotsWeight.map(lotWeight => (
                <GridItemList
                  items={4}
                  fields={[lots.length > 0 ? getLotName(lotWeight.farmLot) : null, lotWeight.cattleQty, lotWeight.cattleWeight]}
                  actions={
                    [
                    {
                        label: "Editar",
                        action: () => openModalEditWeight(lotWeight._id)
                    },
                    {
                        label: "Excluir",
                        action: () => handleDeleteWeight(lotWeight._id)
                    },
                    ] 
                  }
                />
              ))
            }
          </GridTitleList>
      </div>  
      <Footer/>
      <Modal title={titleModal} isOpen={isOpenModal} actionCancel={() => closeModal()} actionSubmit={() => handleSubmitWeight()}>
        <div className="text-field-weight">
          <div className="text-fields">
            <SelectField
              floatingLabelText="Lote"
              value={selectLot}
              onChange={(event, index, value) => setSelectLot(value)}
            >
              {
                lots.map(lot => (
                  <MenuItem value={lot._id} primaryText={lot.name} />
                ))
              }
            </SelectField>
            <TextField
              autoComplete="off"
              name="cattleQty"
              hintText="Digite a quantidade"
              floatingLabelText="Quantidade"
              type="text"
              value={cattleQty}
              style={{
                width: '40%',
                marginLeft: 20
              }}
              onChange={(e) => setCattleQty(e.target.value)}
            />
          </div>
          
          <br/><br/>
          
          <div className="text-fields">
            <TextField
              autoComplete="off"
              name="cattleWeight"
              hintText="Digite o peso total"
              floatingLabelText="Peso total"
              type="text"
              value={cattleWeight}
              style={{
                width: '40%',
                marginRigth: 10
                
              }}
              onChange={(e) => setCattleWeight(e.target.value)}
            />
            <DatePicker 
              value={date} 
              onChange={(event, date) => setDate(date)} 
              hintText="Data"
              style={{
                width: '40%',
                marginTop: 24,
                marginLeft: 20

              }}
            />
          </div>
        </div>
      </Modal>
    </div>  
  );
}

export default Farm;
