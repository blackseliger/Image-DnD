
import moment from "moment";

const header = [
  {
    id: 'name',
    title: 'Name',
    template: (data) => { return `<div class="table__content-cell table__content-cell_accordion">
    <div class="table__icon-accordion">
    <svg class="table__icon-img" data-element="handleOpen" width="18" height="10" viewBox="0 0 18 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path  clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L9 7.58579L16.2929 0.292893C16.6834 -0.0976311 17.3166 -0.0976311 17.7071 0.292893C18.0976 0.683417 18.0976 1.31658 17.7071 1.70711L9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
</svg>

    </div>    
    <div data-row='name'>${data}</div>
</div>`;}
   
  },
  {
    id: 'created',
    title: 'date',
    template: data => {
      const date = moment(data).format("DD:MM:YYYY h:mm");
    
      return `<div class="table__content-cell" data-element="${data}">${date}</div>`;
    }
  },
  {
    id: 'action',
    title: 'Action',
    template: () => { return `<div class="table__content-cell table__content-cell-icons">
    <div class="table__icon">
        <img src="./assets/icons/handleEdit.svg" class="table__icon-img" data-element="handleEdit" alt="edit">
    </div>
    <div class="table__icon">
        <img src="./assets/icons/handleDelete.svg" class="table__icon-img" data-element="handleDelete" alt="delete">
    </div>
</div>`;
    }
  },
];

export default header;
