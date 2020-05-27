<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>商品分类</h2>
    </div>
    <el-tree node-key="id" ref="tree" :load="loadNode" lazy :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" :disabled="data.label == '全部分类' ? true : false" @click.stop="openEditModal(node,data)">
            <i class="el-icon-edit"></i>
            编辑
          </el-button>
          <el-button type="text" size="mini" @click.stop="openInsertModal(node,data)">
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button type="text" size="mini" @click.stop="openRemoveModal(node,data)">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog title="编辑分类" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加分类" :visible.sync="insertVisible">
      <el-form :model="insertForm" :rules="rules" ref="insertForm">
        <el-form-item label="分类名称" props="name" :label-width="formLabelWidth">
          <el-input v-model="insertForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inertVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleInert('insertForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { Category } from "@/api/index";
export default {
  data() {
    return {
      editVisible: false,
      insertVisible: false,
      defaultProps: {
        // children: "children",
        label: "name",
      },
      nodeData: {},
      node: {},
      insertForm: {
        name: "",
        pId: "",
      },
      editForm:{
        id:"",
        name: "",
        pId: "",
      },
      rules: {
        name: [
          {required:true , message: '请输入分类名称', trigger:'blur'}],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // openInsertModal(node,data){
    //   // 转存父级分类id
    //   this.insertForm.pId=data.id;
    //   // 转存父类节点parentNode
    //   this.node =node;
    //   this.insertVisible = true;
    // },
    // openRemoveModal(node,data){
    //   this.$confirm('确定删除此分类吗?',{type:'warning'})
    //   .then(async()=>{
    //     // 发送ajax
    //     let {status} = await Category.remove(data.id);
    //     console.log({...data})
    //     if(status){
    //       // 界面上的数据删除
    //       this.$refs.tree.remove(node,data);
    //       this.$message.success('删除成功！');
    //     } else {
    //       this.$message.error('删除失败！')
    //     }
    //   })
    // },
    // openEditModal(node,data){
    //   // // 转存节点数据 二选一
    //   this.nodeData = data
    //   this.node =node
    //   console.log(data);
    //   this.editForm={...data};
    //   this.editVisible=true;
    // },

    // async loadNode(node,resolve){
    //   console.log(node)
    //   // 根节点
    //   if (node.level == 0){
    //     return resolve([{name:"全部分类"}]);
    //   }
    //   // 子节点，一级分类
    //   if(node.level==1){
    //     let {status,data} = await Category.subcate({id:0});
    //     if(status){
    //       resolve(data);
    //     }
    //   }
    //   // 子节点，二级以上分类
    //   if(node.level>1){
    //     let {id} = node.data;
    //     let {status ,data} =await Category.subcate({id});
    //     if(status){
    //       resolve(data);
    //     }
    //   }
    // },
    async loadNode(node, resolve) {
      console.log(node);
      // 根节点
      if (node.level == 0) {
        return resolve([{ name: "全部分类", id: 1 }]);
      }
      // 子节点，一级分类
      if (node.level > 1) {
        let { id } = node.data;
        let { status, data } = await Category.subcate({ id });
        if (status) {
          resolve(data);
        }
      }
    },
    handleInert(formName){
      this.$refs[formName].validate(async(valid)=>{
        if(valid){
          let { status ,msg ,data } = await Category.insert({...this.insertForm})
          if(status){
            // 关闭弹窗
            this.insertVisible = false
            // 操作dom，添加节点
            this.$refs.tree.append({...this.insertForm, ...data}, this.node)

          }
        }
      })
    },
    handleEdit(formName){
      this.$refs[formName].validate(async(valid)=>{
        if(valid){
          let{status,msg} =await Category.edit({...this.editForm})
          if(status){
            this.$message.success(msg);
            this.editVisible = false;
            // 更新节点
            this.node.Data = this.editForm          
          } else {
            this.$message.error(msg);
          }
        }
      })
    }
  },
};
</script>

<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  i {
    margin-right: 10px;
  }
}
</style>