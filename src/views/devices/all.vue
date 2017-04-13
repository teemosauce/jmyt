<template>
	<div>

		<el-row style="padding:10px;" :gutter="10">
			<el-col :span="4">
				<el-select v-model="searchKey" placeholder="请选择">
					<el-option
				      v-for="(item, index) in columns" :key="index" v-if="item.canSearch"
				      :label="item.label"
				      :value="item.key">
				    </el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-input v-model="searchInput" placeholder="请输入内容"></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" @click="search">搜 索</el-button>
			</el-col>

			<el-col :span="8">
				<el-button type="primary" style="float:right;" @click="customColumnVisible=true">设 置</el-button>
			</el-col>
		</el-row>
			
		
		<el-dialog title="自定义列表项" v-model="customColumnVisible">
		  <div>
		  	<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		  	<div style="margin: 15px 0;"></div>
		  	<el-checkbox-group v-model="checkedColumns" @change="handleCheckedCitiesChange">
				<el-checkbox v-for="(item, index) in columns" :key="index" :label="item.key">{{item.label}}</el-checkbox>
			</el-checkbox-group>
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="customColumnVisible=false">取 消</el-button>
		    <el-button type="primary" @click="renderList">确 定</el-button>
		  </div>
		</el-dialog>


		<el-table height="500" v-loading="loading" element-loading-text="拼命加载中" :data="result" border style="width: 100%;" @selection-change="handleSelectionChange" :default-sort = "{prop: 'modifyTime', order: 'descending'}">
			<el-table-column type="selection" width="55" ></el-table-column>
			
			<!-- <el-table-column v-for="col in checkedColumns" :prop="col.key" :label="col.label" width="120">
				
			</el-table-column> -->
			<el-table-column prop="equipmentID" label="编号" width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="equipmentName" label="名称" width="120"></el-table-column>
			<el-table-column prop="equipmentModel" label="规格型号" width="120"></el-table-column>
			<el-table-column prop="equipmentType" label="类型" width="120"></el-table-column>
			<el-table-column label="购置日期" width="120">
				 <template scope="scope">{{ scope.row.purchaseDate | shortDateFormat}}</template>
			</el-table-column>
			<el-table-column label="使用年限" width="100">
				 <template scope="scope">{{ scope.row.serviceLife | useYear}}</template>
			</el-table-column>
			<el-table-column prop="department" label="使用部门" width="120"></el-table-column>
			<el-table-column prop="area" label="安装区域" width="120"></el-table-column>
			<el-table-column prop="endpoint" label="采集点名称" width="120"></el-table-column>
			<el-table-column prop="equipmentStatus" label="状态" width="80"></el-table-column>
			<el-table-column label="最后修改时间" width="160">
				<template scope="scope">{{scope.row.modifyTime | fullDateFormat}}</template>
			</el-table-column>
			<el-table-column label="操作" width="100" fixed="right">
				<template scope="scope">
					<el-button type="text" @click="handleView" size="small">查看</el-button>
					<el-button type="text" @click="handleEdit" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageTotal" style="float:right;">
	    </el-pagination>

	    <el-dialog title="设备详细" v-model="dialogFormVisible">
		  <div>
			  <el-form :model="form">
			  	<template v-for='n in 10'>
				    <el-form-item label="活动名称" :label-width="formLabelWidth">
				      <el-input v-model="form.name" auto-complete="off"></el-input>
				    </el-form-item>
			  	</template>
			    <el-form-item label="活动区域" :label-width="formLabelWidth">
			      <el-select v-model="form.region" placeholder="请选择活动区域">
			        <el-option label="区域一" value="shanghai"></el-option>
			        <el-option label="区域二" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
			  </el-form>
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import * as api from '../../api/feed'

	export default {
		name: 'All',

		created() {
			this.searchKey = this.columns[0].key;
			this.handleCurrentChange(this.currentPage)
		},

		data() {
			return {
				result: [],
				multipleSelection: [],
				currentPage: 1,
				pageSize: 10,
				pageTotal: 0,

				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					name: '',
					region: ''
				},
				equipmentIDShow: true,
				columns: [{
					label: '编号',
					key: 'equipmentID',
					canSearch: true,
				}, {
					label: '名称',
					key: 'equipmentName',
					canSearch: true,
				}, {
					label: '规格型号',
					key: 'equipmentModel',
					canSearch: true,
				}, {
					label: '类型',
					key: 'equipmentType',
					canSearch: true,
				}, {
					label: '购置日期',
					key: 'purchaseDate',
					canSearch: false,
				}, {
					label: '使用年限',
					key: 'serviceLife',
					canSearch: true,
				}, {
					label: '使用部门',
					key: 'department',
					canSearch: true,
				}, {
					label: '安装区域',
					key: 'area',
					canSearch: true,
				}, {
					label: '采集点名称',
					key: 'endpoint',
					canSearch: true,
				}],
				searchKey: '',
				searchInput: '',
				customColumnVisible: false,
				checkAll: true,
				checkedColumns: [],
				isIndeterminate: true,
				loading: false
			}
		},

		methods: {
			formatter(row, col) {
				return row.equipmentID + row.equipmentName
			},

			search() {

			},

			renderList(){
				this.customColumnVisible = false;

			},

			handleCheckAllChange(event) {
				let checked =  event.target.checked;
				if(checked){
					this.checkedColumns = this.columns.map(item => {
						return item.key;
					})
				}else{
					this.checkedColumns = [];	
				}
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				console.log(value)
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.columns.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			handleCurrentChange(val) {
				if (val) {
					this.currentPage = val;
				}
				this.loading = true;
				api.queryFeedsByTable({
					'query.type': '1001',
					tableName: 'UserDefined'
				}, this.currentPage, this.pageSize).then(res => {
					this.result = res.object;
					this.pageTotal = res.pageInfo.total;
					this.loading = false;
				}, err => {
					this.loading = false;
					this.$message({
						
					})
					console.log(err)
				})
			},

			handleSizeChange(size) {
				this.pageSize = size;
				this.handleCurrentChange()
			},

			handleView() {
				this.dialogFormVisible = true;
			},

			handleEdit() {

			}
		},

	}
</script>

<style lang="scss">

</style>