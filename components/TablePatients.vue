<template>
  <div>
    <div class="card-header d-flex justify-content-between">
<!--      <h4 class="d-flex align-items-center">Pacientes</h4>-->
      <div class="d-flex align-items-center">
        <!--=====================================
         BUSCAR PACIENTE
       ======================================-->
        <div class="mr-4">
          <label class="form-label">Buscar por nombre, correo o documento</label>
          <input v-model="valueSearchPatient" v-on:keyup.enter="search" type="text" class="form-control search-students" placeholder="Buscar paciente...">
        </div>
      </div>
    </div>

    <!--=====================================
		          TABLA CON LOS PACIENTES
            ======================================-->
    <div class="table-responsive" v-if="patients.length > 0">
      <client-only>
        <ve-table
          id="loading-container"
          :scroll-width="1200"
          border-y
          :row-style-option="rowStyleOption"
          fixed-header
          :sort-option="sortOption"
          :max-height="500"
          :checkbox-option="checkboxOption"
          row-key-field-name="rowKey"
          :event-custom-option="eventCustomOption"
          :columns="columnsTable"
          :table-data="tableData"/>
        <div class="table-pagination mt-2" v-if="patients.length > 10">
          <ve-pagination
            :total="totalCount"
            :page-index="pageIndex"
            :page-size="pageSize"
            @on-page-number-change="pageNumberChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePatients",
  data(){
    return{
      valueSearchPatient: String(),
      messageIsPatients: false,
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      sortOption: {
        sortChange: (params) => {
          console.log("sortChange::", params);
          this.sortChange(params);
        },
      },
      eventCustomOption: {
        bodyRowEvents: ({row, rowIndex}) => {
          return {
            dblclick: (event) => {
              alert('CLICK')
            },
          };
        },
      },
      checkboxOption: {
        selectedRowKeys: [],

        selectedRowChange: ({row, isSelected, selectedRowKeys}) => {
          this.changeSelectedRowKeys(row, isSelected);
        },

        selectedAllChange: ({isSelected, selectedRowKeys}) => {
          this.changeSelectAll(isSelected, selectedRowKeys);
        },
      },
      columnsTable: [
        // {
        //   field: "",
        //   key: "a",
        //   title: "#",
        //   align: "center",
        //   fixed: "left",
        //   renderBodyCell: ({row, column, rowIndex}, h) => {
        //     return ++rowIndex;
        //   },
        // },
        {
          field: "name",
          type: "checkbox",
          sortBy: "",
          key: "name",
          title: "Nombre",
          align: "left",
          fixed: "left"
        },
        {field: "email", key: "email", title: "Email", align: "left"},
        {field: "document", key: "document", title: "Documento", align: "left"},
        {field: "document_type", key: "document_type", title: "Tipo de Documento", align: "left"},
        {field: "phone", key: "phone", title: "Teléfono", align: "left"},
        {field: "gender", key: "gender", title: "Género", align: "left"},
        {field: "country", key: "country", title: "País", align: "left"},
      ],
      pageIndex: 1,
      pageSize: 20,
      /*Data information*/
      patients: [],
      checked: [],
      urlExportExcel: '',
      selectedPatients: [],
    }
  },
  methods:{
    search() {
      const searchValue = this.valueSearchPatient;
      let exist = []
      if (searchValue){
        exist = this.patients.filter(
          (x) =>
            !searchValue.length ||
            x.name.toLowerCase().includes(searchValue.toLowerCase()) || x.email.toLowerCase().includes(searchValue.toLowerCase()) || x.document.toLowerCase().includes(searchValue.toLowerCase()),
        );
        if (exist.length > 0){
          this.vehicles = exist
        }else{
          this.$toast.error({
            title: 'Error',
            message: 'El paciente que estas buscando no exite en la lista.',
            showDuration: 1000,
            hideDuration: 8000,
          })
        }
      }else{
        this.getPatients()
      }
    },
    sortChange(params) {
      this.patients.sort((a, b) => {
        if (params.name) {
          if (params.name === "asc") {
            if (a.name < b.name) //sort string ascending
              return -1;
          } else if (params.brand === "desc") {
            if (a.name > b.name)
              return -1;
          } else {
            return 0;
          }
        }
      });
    },
    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.resetSelectedRowKeys();
    },
    // page size change
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },
    // reset selectedRowKeys
    resetSelectedRowKeys() {
      this.checkboxOption.selectedRowKeys = [];

      const selectedRowKeysCollection = this.selectedPatients;

      if (selectedRowKeysCollection.length) {
        this.tableData.forEach((item) => {
          if (selectedRowKeysCollection.indexOf(item.rowKey) > -1) {
            this.checkboxOption.selectedRowKeys.push(item.rowKey);
          }
        });
      }
    },
    // selected rowKeys change
    changeSelectedRowKeys(row, isSelected) {
      const rowKey = row.rowKey;

      if (isSelected) {
        this.checkboxOption.selectedRowKeys.push(rowKey);
        this.selectedPatients.push(rowKey);
      } else {
        const index = this.checkboxOption.selectedRowKeys.indexOf(rowKey);
        this.checkboxOption.selectedRowKeys.splice(index, 1);
        this.selectedPatients.splice(index, 1);
      }
    },
    // select all change
    changeSelectAll(isSelected, selectedRowKeys) {
      this.selectedPatients = []
      this.checkboxOption.selectedRowKeys = selectedRowKeys;

      if (isSelected) {
        this.selectedPatients =
          this.selectedPatients.concat(selectedRowKeys);
      } else {
        this.tableData.forEach((item) => {
          const index = this.selectedPatients.indexOf(item.id)
          console.log(index)
          if (index > -1) {
            this.selectedPatients.splice(index, 1);
          }
        });
      }
    },
    async getPatients() {
      this.$vs.loading({
        color: process.env.COLOR_BASE,
        text: 'Espere por favor...'
      })
      await this.$axios.get(`/api/v1/get-patients-doctor`).then(resp => {

        this.patients = resp.data.data
        if (this.patients.length === 0) {
          this.messageIsPatients = true
        }
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.loading.close()
        console.log(e)
        this.$toast.error({
          title: 'Error',
          message: 'Al obtener los datos de los pacientes. Consulte con el administrador',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      })
    },
  },
  watch:{
    valueSearchPatient: function (value){
      if (!value){
        this.getPatients()
      }
    },
  },

  computed: {
    // table data
    tableData() {
      const {pageIndex, pageSize} = this;
      return this.patients.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    // total count
    totalCount() {
      return this.patients.length;
    },
  },
  mounted() {
    this.getPatients()
  }
}
</script>

<style scoped>

</style>
