<template>
  <div>
      <div class="sidebar-icon">
          <img  :src="iconPath" alt="icon" />
      </div>
      <div class="sidebar-item selected"  @click="selectItem($event,'dzbl')">电子病历</div>
      <div class="sidebar-item" @click="selectItem($event,'szjl')">面诊记录</div>
  </div>
</template>

<script>
import dzblIcon from '@/assets/DataScouting_pictures/dzbl.webp';
import szjlIcon from '@/assets/DataScouting_pictures/szjl.webp';
import mzjlIcon from '@/assets/DataScouting_pictures/mzjl.webp';
export default {
  data(){
    return{
      iconPath:dzblIcon
    }
  },
  methods: {
      selectItem(event,type) {
          // First remove the 'selected' class from all items
          var items = document.getElementsByClassName('sidebar-item');
          for (var i = 0; i < items.length; i++) {
              items[i].classList.remove('selected'); // Remove only 'selected' class
          }
          // Then add the 'selected' class to the clicked item
          event.currentTarget.classList.add('selected'); // Add only 'selected' class
          if (type === 'dzbl') {
                this.iconPath = dzblIcon;
            } else if (type === 'szjl') {
                this.iconPath = szjlIcon;
            } else if (type === 'mzjl') {
                this.iconPath = mzjlIcon;
            }
         this.$emit('change-kind', type )
      }
  }
}
</script>

<style>
/* Your existing CSS styles */
</style>


<style>

.sidebar-icon {
  width: 100%;
  height: width;
  text-align: center; /* Center the icon */
  margin: 0,auto;
  margin-bottom: 20px; /* Space below the icon */

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.sidebar-icon img {
  width: 100%; 
  height: auto;
}

.sidebar-item {
  display: flex; /* Use flexbox for centering */
  align-items: center; /* Align items vertically */
  justify-content: center; /* Align items horizontally */
  padding: 10px 15px; /* Padding within each item */
  margin-bottom: 20px; /* Space between items */
  font-size: 16px; /* Adjust the font size as needed */
  color: #333333; /* Text color */
  background-color: #f2f2f2; /* Light grey background */
  border-radius: 5px; /* Rounded corners for items */
  cursor: pointer; /* Hand cursor on hover */
  text-align: center; /* Ensure text is centered even if flexbox fails */
  height: 40px; /* Fixed height for each item */
}

.sidebar-item.selected , .sidebar-item:hover {
  color: #ffffff; /* White text for selected/hover state */
  background-color: #007bff; /* Blue background for selected/hover state */
  font-weight: bold; /* Make the font bold */
  font-size: 18px; /* Increase the font size */
}
</style>