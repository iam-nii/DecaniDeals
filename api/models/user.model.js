import mongoose from 'mongoose';


// Creating a schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEXw8PABFicAAAD09PQAAAf9/PwADSFITVS7vL74+PgAFCYAABoAESQAAAT39/cADCEAABPExcYABR4AAA8AABcAABk0O0YACR3d3t/p6uuSlpoAAAydoKPe4OF4fIFYX2XR09Wtr7IwN0EVIi8+REtucnZQVlyJjZGytLbMzc5kZ2xFS1KDiIulqKqPkpUIFiQiKTMJHCsoMTualeH6AAAGLElEQVR4nO2beVerOBjGm4RgAxQoVEulC91X1Ov3/3CTpPeecWZcwEZNOs/vP4+Uk4d3y/Km0wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP8vLBaCcy5EzH56KF8Ai+NRdzydbW42s+m4O4rFdalkotreUZqGiSJMKb07VVekkYn5Hb31yUv8kC7m16KR7yJPy4uyMC29Mg2zSIv0hnN+BRpFsaJKUJLS5eFUd7vd+nRY0lRpjuiqED89wEvhNU0ICTK6GhexTKKKmMfFeEWzQOqmNf/pIV5GvKbKfvRQifif/xDVQWkndB2/8VsnEJtcGrBcVa/EG+PVqpRmzDcOO6rYpFIgvX8jZzI+ViGauitRHKRAP9+/HWl8n8uMk84clcgfZAwmwei9gsBGjzIYe1sn0w3b04BEw3cFKol+JB2572JdjNXQveqjobPCUx/CwYQqtjII6e7jCIt30pnTk3uhOJI+Gh6axBc/hNJPJ18+IsOIqRx2Omr07CiVH2PqmhFHyvXum41a3Mt5AW32NawhHuckGDR+PAxIPnYr2YhVQsLG2UOcQuKv3HLTicwz9MNK8QdWUddyDZuXJFo2NwpfRqScu1T1VSbNWmRHMc0cy6ZchmG+a24TtsuJf+fS5JRJr6P7FgplIEbLLxyQcSaDoF2B0+XToVTDip4s4W2cjkuFtHAn1bCCQuG/cE7hRK75aJvkrxT2HFLYGQ2lwjaJQ2aaYOBQpunETy2rxV5WiyeHTNjhx4SkdQuFdUqSlUsVX5xuSbZuMWtbZy2WIjbAuj0ZVy0UygWi12KWZwGjUmb/xluErK9SqVuLfL5JSHZovAKWTppsXApDtVhos6ZVs9KeU8tDCYua75/pfbmhYwI78b3aEG60j6GWTiR9cGsjSpEHssQ1MaLatQrKLx+PceJarqDKBodK/EHmXc+xvUQNXyTST7sfWVF01Rncwq1E+hu1oxjQ/fvGiSv9lEuT7r/Rh0qy7r9nRdHXAhscUVmJ2FJ1jD9+55R7LAUSunVUoBRw0hIPo9c9NR4dtMCpk0F4RkskYTh+pRuDiXoYKjc+OSxQu2GkOmqWdYezv1Uyxjv10gtU49c7TuwEonpMlZCcHnaFap+NVRNtsTvQXEkfDCtnY/APjE1pploRs5wOVuvT9rReDWiumtpIRqfMtenoa4hiRkMliAR+eDu4Df3zHyGduW/AM0xU62EvjF400EZhL1xfV5dwp7teljQfKHJaLtfd0TV0z76ECT7Z1/fb7fa+3k/4FZnvBbp7NtZdtD89FCPIqtD42Zi7l3JkkUg3TR8WD7+cKxuiekqD8tRsWct2NEqf3KocvKa+nI823PWOVU+U71RPu5jqCXfa9LhsdJ6Cu9OMITalGvCs03jPu7NRn6R0pRs6Pg4+WPj+F36vVoqDoxP7UexmoPvX29lD7EsZuYMbByTqBv1kWbQdalypnva08VnHjyFOPSVw0r66sclSte3bfooo5jJlRI+fEKgkDqNmreE/CCv01tInmyp0k0pgd9OJeFb73P3Ppou4r/e/LTai2MrJidewu/s19BlG/mCtRO1l2c0lky9+zKQTfCqMvwN1tN30BsIbsIk6lLP1wFv3G3j1ZS4mxl6bHofvRSwSktxdGkNi4RP/4rd8CUwdBF7+9bUn2GlEdVid3Fz+8cVRvudooRF1v0Gbbr03X6SN2PiuxvfBpyHxjRxW82ffzqsJjwHJW7Qjvo1qVAweDbzILGffMvQyK3ONviUzM1Op+cbGGzRcOmlpqH+SzXMS/bJsXqNvn/UMzSfZhAbWLaL0Z38y9dn1VTbLGmrVHUlzoSPWIbm1bDtDX1YzUisUbJzKaY1dgchLMxOaM+pyQpDapVCWsMAzlhvON8OsikOdSh/NtaLrOzdWJdPznRdzqaHtnZuvR83ZomdzgcOf7VPYI5HBe7x8EVk2M2V9z+hNZX4Xkd51K1xA4XcDhW2Bwu/nt0JmCjtzafTc75qi/2yjQhJ55oiIjQoNY9mcpqCJb5bEslNE0T3emOX44Z2wb4Zx01hlQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMMhfVN9iJ+wmhv4AAAAASUVORK5CYII="
    },
},{timestamps:true}) //Telling mongodb to record the time a user is added to the database and the time it is updated

const User = mongoose.model('User', userSchema);

export default User;
