<template>
  <div class="cont clearfix">
    <div class="left-box">
      <el-card class="box-card card1">
        <div slot="header" class="header">
          <h2>角色列表</h2>
          <el-button @click="dialogFormVisible = true" class="right" size="small" type="primary" plain><i class="el-icon-circle-plus-outline"></i> 添加角色</el-button>
          <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
            <el-form :model="newForm" :rules="rules" ref="newForm">
              <el-form-item label="名称">
                <el-input v-model="newForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addHandle('newForm')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <template>
          <el-table size="mini" :data="tableData" :default-sort="{ id: 'id' }">
            <el-table-column prop="id" label="#" width="120px"> </el-table-column>
            <el-table-column prop="role_name" label="标签" width="160px" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.name === '超级管理员' ? 'danger' : ''" disable-transitions>{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row.id, scope.row.name)" size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
                <el-button @click="removeHandle(scope.row.id, scope.$index)" size="mini" type="danger" plain><i class="el-icon-delete"></i></el-button>
                <el-button size="mini" type="primary" plain><i class="el-icon-setting"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
    <div class="right-box">
      <el-card class="box-card">
        <div slot="header" class="header">
          <h3><i class="el-icon-collection-tag"></i> 发布文章</h3>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>发布文章</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>发布文章</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>发布文章</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>发布文章</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
        <div class="switch-box">
          <span>商品分类</span>
          <el-switch v-model="value1"></el-switch>
        </div>
      </el-card>
    </div>

    <el-dialog title="编辑角色" :visible.sync="editModal">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editModal = false">取 消</el-button>
        <el-button type="primary" @click="edit('form')">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Auth } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      editModal: false,
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
      },
      newForm: {
        id: "",
        name: "",
      },
      value1: true,
      value2: true,
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  created() {
    //获取列表数据
    this.loadList();
  },
  methods: {
    filterTag(value, row) {
      return row.role_name === value;
    },
    async loadList() {
      let { status, data, total } = await Auth.list();
      if (status) {
        this.tableData = data;
      }
    },
    removeHandle(id, index) {
      console.log(id);
      this.$confirm("确定要删除此账户嘛？", { type: "warning" }).then(async () => {
        //发送ajax
        let { status } = await Auth.remove(id);
        if (status) {
          //删除界面上的数据
          this.tableData.splice(index, 1);
          this.$message.success("删除成功");
        }
      });
    },
    addHandle(newForm) {
      this.$refs[newForm].validate(async (valid) => {
        if (valid) {
          let { status, data } = await Auth.add(this.newForm.name);
          if (status) {
            let newItem = { id: data.id, name: this.newForm.name };
            this.tableData.splice(this.tableData.length, 0, newItem);
            this.dialogFormVisible = false;
            this.$message.success("添加成功！");
            this.newForm.name = "";
          } else {
            this.$message.error("添加失败！");
          }
        } else {
          return false;
        }
      });
    },
    // 编辑
    handleEdit(id, name) {
      this.editModal = true;
      // 存储数据
      this.ID = id;
      this.form.name = name;
    },
    edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { status, data, msg } = await Auth.edit(this.ID, { ...this.form });
          if (status) {
            this.editModal = false;
            this.$message.success("修改成功");
            this.loadList();
          }
        }
      });
    },
  },
};
</script>

<style scoped="scoped">
.cell button {
  margin: 0 3px;
}

.right-box {
  width: 58%;
  margin-left: 20px;
}

.left-box {
  width: 42%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

tbody {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cont {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.switch-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.box-card{
    margin-bottom: 20px;
}
</style>
