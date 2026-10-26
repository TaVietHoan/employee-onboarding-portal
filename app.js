// ========================================================================
// CONFIGURATION & GLOBAL APP STATE
// ========================================================================
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbywxn166MK1yy1GoJoYV1INq0wO9qf5YAZ8xISvweMf_QaSxVVYJIQG4bzRy2Y8xFKqTg/exec';

// Logo Google Drive Direct & Thumbnail Fallback
const COMPANY_LOGO_URL = 'https://lh3.googleusercontent.com/d/1EOrZkL2UB4usQqZg1viwBUlgguX9Fj1V';

const ETHNIC_GROUPS = [
  "Kinh", "Tày", "Thái", "Mường", "H'Mông", "Dao", "Khơ-me", "Nùng", "Hoa", "Gia-rai",
  "Ê-đê", "Ba-na", "Xơ-đăng", "Sán Chay", "Cơ-ho", "Chăm", "Sán Dìu", "Hrê", "Ra-glai",
  "Mnông", "Xtiêng", "Bru-Vân Kiều", "Thổ", "Khơ-mú", "Cơ-tu", "Giáy", "Giẻ-Triêng",
  "Tà-ôi", "Mạ", "Co", "Chơ-ro", "Xinh-mun", "Hà Nhì", "Chu-ru", "Lào", "La Chí",
  "La Ha", "Phù Lá", "La Hủ", "Lự", "Lô Lô", "Chứt", "Mảng", "Pà Thẻn", "Cơ Lao",
  "Cống", "Bố Y", "Si La", "Pu Péo", "Rơ-măm", "Brâu", "Ơ Đu"
];

const RELIGIONS = [
  "Không", "Phật giáo", "Công giáo", "Tin Lành", "Hòa Hảo", "Cao Đài", "Hồi giáo"
];

let APP_STATE = {
  lang: 'vi',
  currentStep: 0,
  links: {},
  addressTree: {}, // { "Hà Nội": ["Phường A", "Xã B"], ... }
  provinces: [],
  uploadedFilesData: {},
  emergencyContactPerson: null,
  isSubmitting: false,
  pendingDraftData: null
};

// ========================================================================
// COMPLETE BILINGUAL DICTIONARY
// ========================================================================
const I18N_DICT = {
  vi: {
    app_title: "Kê Khai Thông Tin Nhân Sự",
    step_badge_prefix: "Bước",
    step_nav_1: "Cá nhân",
    step_nav_2: "Định danh & Nơi ở",
    step_nav_3: "Công việc",
    step_nav_4: "Học vấn",
    step_nav_5: "Thuế & Bank",
    step_nav_6: "Gia đình",
    step_nav_7: "Hồ sơ",
    step_nav_8: "Kiểm tra",
    step_nav_9: "Cam kết",
    
    // Welcome
    welcome_title: "THÔNG TIN KÊ KHAI NHÂN SỰ",
    welcome_subtitle: "Chào mừng bạn gia nhập đội ngũ nhân sự! Vui lòng hoàn thành các bước kê khai thông tin lý lịch và đính kèm hồ sơ theo quy định để chúng tôi hoàn thiện thủ tục tiếp nhận.",
    welcome_badge_time: "⏱ Thời gian hoàn tất: ~10 phút",
    welcome_badge_security: "🔒 Bảo mật dữ liệu tuyệt đối (NĐ 13/2023/NĐ-CP)",
    welcome_badge_prep: "📁 Chuẩn bị sẵn CCCD/Căn cước, Ảnh thẻ & Bằng cấp",
    btn_start: "Bắt đầu kê khai",
    
    // Step 1
    step1_title: "Bước 1: Thông tin cá nhân cơ bản",
    step1_desc: "Vui lòng nhập thông tin cơ bản chính xác theo hộ tịch/giấy khai sinh và CSDL Quốc gia về dân cư.",
    label_fullname: "Họ và tên",
    label_gender: "Giới tính",
    label_other_gender: "Vui lòng nhập giới tính",
    label_dob: "Ngày sinh",
    label_pob_group: "Nơi đăng ký khai sinh / Quê quán",
    helper_pob_note: "ℹ️ Lưu ý: Lấy thông tin từ mục Quê quán hoặc Nơi sinh trên VNeID / Căn cước công dân. Chọn địa giới hành chính sau khi sáp nhập. Phần địa chỉ chi tiết cụ thể có thể để trống nếu không có.",
    label_pob_province: "Tỉnh / Thành phố",
    label_pob_ward: "Phường / Xã",
    label_pob_detail: "Địa chỉ chi tiết (Không bắt buộc)",
    label_marital: "Tình trạng hôn nhân",
    label_other_marital: "Tình trạng hôn nhân khác",
    label_nationality: "Quốc tịch",
    label_other_nationality: "Vui lòng nhập quốc tịch",
    label_ethnicity: "Dân tộc",
    label_other_ethnicity: "Vui lòng nhập tên dân tộc",
    label_religion: "Tôn giáo",
    label_other_religion: "Vui lòng nhập tôn giáo",
    
    // Step 2
    step2_title: "Bước 2: Định danh, Nơi ở & Liên lạc",
    step2_desc: "Các thông tin phục vụ ký kết hợp đồng, đăng ký thuế và bảo hiểm xã hội.",
    label_id_type: "Loại thẻ định danh",
    label_other_id_type: "Loại thẻ khác",
    label_id_number: "Số thẻ định danh",
    label_id_issue_date: "Ngày cấp thẻ",
    label_id_expiry_date: "Ngày hết hạn",
    label_id_issue_place: "Nơi cấp thẻ",
    label_other_id_issue_place: "Nhập cơ quan cấp thẻ khác",
    
    label_perm_addr_group: "Hộ khẩu thường trú",
    helper_addr_merged_note: "ℹ️ Lưu ý địa chỉ: Kê khai theo địa chỉ hành chính sau khi sáp nhập mới nhất (theo thông tin hiển thị trên VNeID / CCCD / Thẻ Căn cước). Ô chi tiết bắt buộc ghi đầy đủ các cấp đến trước Phường/Xã (số nhà, ngõ, đường, tổ/thôn/xóm).",
    label_addr_province: "Tỉnh / Thành phố",
    label_addr_ward: "Phường / Xã",
    label_addr_detail: "Địa chỉ chi tiết trước Phường/Xã (Số nhà, đường, ngõ, thôn/xóm/tổ)",
    
    label_curr_addr_group: "Nơi ở hiện tại (Cư trú thực tế)",
    label_phone: "Số điện thoại liên lạc",
    label_email: "Email cá nhân",
    
    // Step 3
    step3_title: "Bước 3: Thông tin công việc",
    step3_desc: "Vui lòng chọn hình thức và thời gian làm việc đã thỏa thuận.",
    label_working_type: "Hình thức làm việc",
    label_working_time: "Thời gian làm việc",

    // Step 4
    step4_title: "Bước 4: Học vấn & Kinh nghiệm làm việc",
    step4_desc: "Kê khai quá trình đào tạo và các đơn vị đã từng công tác.",
    label_edu_level: "Trình độ học vấn cao nhất",
    label_other_edu_level: "Trình độ học vấn khác",
    label_school: "Trường học / Cơ sở tốt nghiệp",
    label_major: "Chuyên ngành",
    label_grad_year: "Năm tốt nghiệp (yyyy)",
    label_exp_summary: "Tóm tắt kinh nghiệm làm việc",
    label_no_exp: "Tôi chưa có kinh nghiệm làm việc",
    th_from: "Từ tháng/năm",
    th_to: "Đến tháng/năm",
    th_company: "Tên công ty",
    th_position: "Chức danh",
    th_tasks: "Nội dung công việc",
    th_action: "Xóa",
    btn_add_exp: "Thêm kinh nghiệm",
    label_edu_certs: "Các chứng chỉ liên quan đến lĩnh vực Giáo dục",
    label_edu_exp_years: "Số năm kinh nghiệm trong ngành GD",
    label_living_abroad: "Thời gian sống ở nước ngoài",

    // Step 5
    step5_title: "Bước 5: Thuế, BHXH & Tài khoản thanh toán",
    step5_desc: "Kê khai thông tin phục vụ chi trả lương và chế độ phúc lợi.",
    label_tax_id: "Mã số thuế Thu nhập cá nhân",
    label_social_insurance: "Số sổ Bảo hiểm Xã hội",
    helper_social_insurance: "Nếu chưa từng tham gia BHXH tại đơn vị nào, vui lòng điền 'Chưa có'.",
    label_health_place: "Nơi đăng ký khám chữa bệnh ban đầu (dự kiến sau thử việc)",
    helper_health_place: "Tra cứu cơ sở y tế đủ điều kiện tiếp nhận tại:",
    link_health_kcb: "Tham khảo danh sách nơi đăng ký KCB ban đầu",
    label_bidv_account: "Tài khoản ngân hàng BIDV (Chi nhánh Thanh Xuân)",
    label_other_bank: "Tài khoản ngân hàng khác BIDV",
    helper_other_bank: "Bắt buộc ghi đủ thông tin: Chủ tài khoản - Ngân hàng - Số tài khoản - Chi nhánh nếu chưa có BIDV.",
    label_vehicle_info: "Thông tin xe đăng ký gửi tại Công ty / Cơ sở trường",
    helper_vehicle_info: "Nếu không sử dụng phương tiện cá nhân, vui lòng điền 'Không'.",

    // Step 6
    step6_title: "Bước 6: Thông tin Gia đình & Giảm trừ gia cảnh",
    step6_desc: "Kê khai thân nhân và xác lập duy nhất 01 người liên lạc khẩn cấp.",
    label_family_table: "Thông tin tất cả người thân trong gia đình (Bố, Mẹ, Vợ/Chồng, Con, Anh/Chị/Em)",
    th_fam_name: "Họ và tên",
    th_fam_birthyear: "Năm sinh",
    th_fam_relation: "Mối quan hệ",
    th_fam_job: "Nghề nghiệp",
    th_fam_workplace: "Nơi làm việc",
    th_fam_emergency: "Khẩn cấp?",
    btn_add_family: "Thêm người thân",
    label_emergency_phone: "Số điện thoại người liên lạc khẩn cấp",
    label_has_dependents: "Bạn có đăng ký người phụ thuộc (giảm trừ gia cảnh) không?",
    th_dep_name: "Họ tên NPT",
    th_dep_birthyear: "Năm sinh",
    th_dep_relation: "Mối quan hệ",
    th_dep_tax: "Mã số thuế NPT",
    th_dep_effect: "Thời điểm tính giảm trừ",
    btn_add_dependent: "Thêm người phụ thuộc",

    // Step 7
    step7_title: "Bước 7: Đính kèm hồ sơ & giấy tờ nhân sự",
    step7_desc: "Chấp nhận định dạng: PDF, JPG, PNG, DOC, DOCX. Dung lượng tối đa: 15MB/file.",
    doc_photo_title: "Ảnh thẻ chân dung (3x4 hoặc 4x6)",
    doc_cccd_title: "Bản sao CCCD / Thẻ Căn cước",
    doc_syll_title: "Sơ yếu lý lịch (SYLL)",
    doc_health_title: "Giấy khám sức khỏe",
    doc_vneid_title: "Xác thực cư trú VNeID",
    doc_degree_title: "Bằng cấp chuyên môn & Chứng chỉ",
    tag_mandatory: "Bắt buộc",
    tag_optional: "Không bắt buộc",
    btn_choose_file: "Chọn tệp...",
    status_no_file: "Chưa chọn tệp",
    notice_first_day_title: "Lưu ý quan trọng khi nhận việc:",
    notice_first_day_content: "Tại ngày đầu tới nhận việc, anh/chị mang đầy đủ các hồ sơ trên (Bản sao chứng thực: CCCD/Căn cước, Bằng tốt nghiệp/Chứng chỉ; Bản gốc: SYLL, Giấy khám sức khỏe; Bản photo: Xác thực cư trú trên VNEID; 02 ảnh thẻ 4cm x 6cm) nộp cho bộ phận Nhân sự của Công ty.",

    // Step 8
    step8_title: "Bước 8: Rà soát & Kiểm tra thông tin",
    step8_desc: "Vui lòng kiểm tra kỹ lưỡng các mục dưới đây trước khi chuyển sang bước cam kết.",
    btn_confirm_review: "Xác nhận & Sang Cam kết",

    // Step 9
    step9_title: "Bước 9: Cam kết & Hoàn tất kê khai",
    step9_desc: "Xác nhận pháp lý về tính trung thực và cam kết bảo vệ dữ liệu cá nhân theo quy định.",
    
    // Privacy Statement from Company
    company_privacy_title: "CAM KẾT BẢO VỆ DỮ LIỆU CÁ NHÂN CỦA CÔNG TY",
    company_privacy_badge: "Tuân thủ Nghị định 13/2023/NĐ-CP",
    company_privacy_content: "Công ty cam kết toàn bộ dữ liệu, thông tin cá nhân và hồ sơ đính kèm do người lao động cung cấp chỉ được sử dụng cho mục đích quản lý nhân sự nội bộ, thực hiện thủ tục tiếp nhận, ký kết hợp đồng lao động, đóng BHXH, kê khai thuế TNCN và giải quyết chế độ phúc lợi theo quy định của Pháp luật. Công ty cam đoan bảo mật tuyệt đối, không cung cấp, mua bán, chuyển giao hoặc sử dụng dữ liệu của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại khi chưa có sự đồng ý của bạn.",
    
    commitment_header: "CAM KẾT CỦA NGƯỜI LAO ĐỘNG",
    commitment_text: "\"Tôi đã đọc kỹ cam kết bảo mật của Công ty. Tôi xin cam kết toàn bộ những thông tin đã kê khai trên đây (đặc biệt là thông tin cư trú sau khi sáp nhập) là hoàn toàn đúng sự thật. Nếu có điều gì sai sót hoặc không trùng khớp với hồ sơ gốc bản cứng, tôi xin chịu mọi trách nhiệm trước Công ty và trước pháp luật.\"",
    commitment_agree: "Tôi đã đọc, hiểu rõ và đồng ý với các cam kết trên",
    btn_back_review: "Quay lại kiểm tra",
    btn_finish_submit: "Hoàn tất kê khai",

    // Step 10
    success_title: "KÊ KHAI THÀNH CÔNG",
    success_desc: "Cảm ơn bạn đã hoàn tất việc kê khai thông tin nhân sự.<br>Toàn bộ hồ sơ của bạn đã được mã hóa và lưu trữ an toàn trên hệ thống.",
    success_contact_hr: "Vui lòng chuẩn bị các hồ sơ bản cứng như hướng dẫn để nộp vào ngày đầu nhận việc.",

    // Modal Draft
    draft_modal_title: "Tìm thấy bản nháp đang lưu",
    draft_modal_desc: "Hệ thống ghi nhận bạn đã từng kê khai dở dang trước đó. Bạn có muốn tiếp tục bản kê khai này không?",
    btn_draft_resume: "Khôi phục & Tiếp tục",
    btn_draft_discard: "Làm mới từ đầu",

    // Buttons & General
    btn_home: "Trang chủ",
    btn_continue: "Tiếp tục",
    btn_back: "Quay lại",
    btn_confirm_submit: "Xác nhận gửi",
    modal_confirm_title: "Xác nhận gửi kê khai",
    modal_confirm_desc: "Vui lòng đảm bảo các thông tin cá nhân và hồ sơ đính kèm là hoàn toàn chính xác. Bạn có chắc chắn muốn hoàn tất việc kê khai ngay bây giờ?",
    footer_title: "© Cổng Thông Tin Nhân Sự - Bộ phận Nhân sự (EDUCO)",
    footer_desc: "Thông tin kê khai được bảo vệ theo Nghị định 13/2023/NĐ-CP và chỉ sử dụng cho mục đích quản lý nhân sự theo quy định.",

    // Dropdown Option Translations
    opt_select_prefix: "-- Chọn / Select --",
    opt_select_prov: "-- Chọn Tỉnh / Thành phố --",
    opt_select_ward: "-- Chọn Phường / Xã --",
    opt_gender_male: "Nam",
    opt_gender_female: "Nữ",
    opt_gender_other: "Khác",
    opt_marital_single: "Độc thân",
    opt_marital_married: "Đã kết hôn",
    opt_marital_divorced: "Ly hôn",
    opt_marital_other: "Khác",
    opt_vietnam: "Việt Nam",
    opt_other: "Khác",
    opt_id_cccd: "Căn cước công dân (12 số) / Thẻ Căn cước",
    opt_id_passport: "Hộ chiếu (Passport)",
    opt_id_other: "Khác (Giấy tờ hợp pháp khác)",
    opt_place_c06: "Cục Cảnh sát Quản lý Hành chính về Trật tự Xã hội",
    opt_place_c72: "Cục Cảnh sát Đăng ký quản lý Cư trú và Dữ liệu Quốc gia về Dân cư",
    opt_place_bca: "Bộ Công an",
    opt_place_other: "Khác",
    opt_fulltime: "Fulltime (Toàn thời gian)",
    opt_parttime: "Parttime (Bán thời gian)",
    opt_time_ft: "Toàn thời gian",
    opt_time_under1m: "Dưới 1 tháng",
    opt_time_over1m: "Trên 1 tháng",
    opt_edu_postgrad: "Trên Đại học",
    opt_edu_bachelor: "Đại học",
    opt_edu_college: "Cao đẳng",
    opt_edu_vocational: "Trung cấp",
    opt_edu_elementary: "Sơ cấp",
    opt_edu_highschool: "Phổ thông trung học",
    opt_edu_cert: "Chứng chỉ nghề",
    opt_edu_unskilled: "Lao động phổ thông",
    opt_edu_other: "Khác",
    opt_no: "Không",
    opt_yes: "Có",

    // Placeholders
    ph_fullname: "Nhập họ và tên đầy đủ (VD: NGUYỄN VĂN A)",
    ph_other_gender: "Nhập giới tính của bạn",
    ph_pob_detail: "Số nhà, ngõ/ngách, đường (Nếu có - có thể để trống)",
    ph_addr_detail: "Số nhà, ngõ, đường/phố, thôn/xóm/tổ (ghi rõ cấp trước Phường/Xã)",
    ph_other_marital: "Nhập tình trạng hôn nhân",
    ph_other_nationality: "Nhập tên quốc gia",
    ph_other_ethnicity: "Nhập tên dân tộc",
    ph_other_religion: "Nhập tên tôn giáo",
    ph_other_id_type: "VD: Thẻ căn cước công dân nước ngoài / Tạm trú",
    ph_id_number: "Nhập số CCCD/Căn cước/Hộ chiếu",
    ph_other_id_issue_place: "Nhập đầy đủ tên cơ quan cấp thẻ",
    ph_phone: "VD: 0912345678",
    ph_email: "VD: nguyenvana@gmail.com",
    ph_other_edu_level: "Nhập trình độ đào tạo của bạn",
    ph_school: "VD: Đại học Sư phạm Hà Nội",
    ph_major: "VD: Sư phạm Tiếng Anh",
    ph_grad_year: "VD: 2022",
    ph_edu_certs: "VD: IELTS 7.5, TESOL 120h, Nghiệp vụ sư phạm... (Nếu không có ghi 'Không')",
    ph_edu_exp_years: "VD: 2.5",
    ph_living_abroad: "VD: 2 năm - Singapore (Nếu không có ghi 'Không')",
    ph_tax_id: "Nhập MST hoặc điền 'Chưa có'",
    ph_social_insurance: "Nhập mã số BHXH hoặc điền 'Chưa có'",
    ph_health_place: "VD: Bệnh viện Đa khoa Đống Đa",
    ph_bidv_account: "VD: 1234567890 - NGUYEN VAN A - Chi nhánh THANH XUAN (hoặc 'Chưa có')",
    ph_other_bank: "VD: NGUYEN VAN A - VIETCOMBANK - 1234567890 - Chi nhánh Thăng Long (Nếu đã có BIDV điền 'Không')",
    ph_vehicle_info: "Loại xe: Xe máy - Lead\nMàu: Trắng\nBiển số: 29L1 - 01232",
    ph_emergency_phone: "Nhập SĐT của người thân được chọn làm khẩn cấp",

    // Callouts Content
    callout_tax_html: `
      <strong>Hướng dẫn Mã số thuế TNCN:</strong><br>
      1. Điền đúng MST cá nhân đã tra cứu đồng bộ với CCCD.<br>
      2. Nếu chưa có MST cá nhân, vui lòng điền <strong>"Chưa có"</strong> và tải mẫu: 
      <a id="linkMstAuth" href="#" target="_blank">ỦY QUYỀN MỞ MST</a> để nộp bản cứng cho Công ty vào ngày nhận việc.
    `,
    callout_bidv_html: `
      <strong>Tài khoản ngân hàng BIDV:</strong><br>
      Điền theo cấu trúc: <code>Số tài khoản - Tên chủ thẻ - Chi nhánh</code><br>
      * Lưu ý: Nếu có thẻ BIDV nhưng không thuộc chi nhánh Thanh Xuân, vui lòng điền <strong>"Chưa có"</strong> và tải mẫu:
      <a id="linkBankAccount" href="#" target="_blank">FORM MỞ TÀI KHOẢN</a> để Công ty hỗ trợ mở mới.
    `,
    callout_dep_html: `
      Căn cứ theo: <a id="linkTt111" href="#" target="_blank">Điều 9 Thông tư 111/2013/TT-BTC</a>.<br>
      Vui lòng tải: <a id="linkNptForm" href="#" target="_blank">MẪU ĐĂNG KÝ NPT</a> để nộp hồ sơ chứng minh cho phòng Nhân sự.
    `
  },
  en: {
    app_title: "Employee Onboarding Portal",
    step_badge_prefix: "Step",
    step_nav_1: "Personal",
    step_nav_2: "ID & Address",
    step_nav_3: "Job Info",
    step_nav_4: "Education",
    step_nav_5: "Tax & Bank",
    step_nav_6: "Family",
    step_nav_7: "Documents",
    step_nav_8: "Review",
    step_nav_9: "Commitment",

    // Welcome
    welcome_title: "EMPLOYEE ONBOARDING PORTAL",
    welcome_subtitle: "Welcome to our team! Please complete the personal information declaration and attach mandatory documents so we can finalize your onboarding process.",
    welcome_badge_time: "⏱ Completion time: ~10 mins",
    welcome_badge_security: "🔒 100% Confidential (Decree 13/2023/ND-CP)",
    welcome_badge_prep: "📁 Prepare your ID Card, Portrait Photo & Diplomas",
    btn_start: "Start Declaration",

    // Step 1
    step1_title: "Step 1: Basic Personal Information",
    step1_desc: "Please provide accurate basic information matching your birth certificate/civil registry & National Population DB.",
    label_fullname: "Full Name",
    label_gender: "Gender",
    label_other_gender: "Please specify gender",
    label_dob: "Date of Birth",
    label_pob_group: "Place of Birth Registration / Native Place",
    helper_pob_note: "ℹ️ Note: Retrieve info from Native Place or Place of Birth on VNeID/Citizen ID. Choose post-merger administrative divisions. Detail address is optional.",
    label_pob_province: "Province / City",
    label_pob_ward: "Ward / Commune",
    label_pob_detail: "Detailed Address (Optional)",
    label_marital: "Marital Status",
    label_other_marital: "Other marital status",
    label_nationality: "Nationality",
    label_other_nationality: "Please specify nationality",
    label_ethnicity: "Ethnicity",
    label_other_ethnicity: "Please specify ethnicity",
    label_religion: "Religion",
    label_other_religion: "Please specify religion",

    // Step 2
    step2_title: "Step 2: Identification & Contact",
    step2_desc: "Information required for employment contract, tax and social insurance registration.",
    label_id_type: "Identity Document Type",
    label_other_id_type: "Other identity document type",
    label_id_number: "ID Card / Passport Number",
    label_id_issue_date: "Issue Date",
    label_id_expiry_date: "Expiry Date",
    label_id_issue_place: "Place of Issue",
    label_other_id_issue_place: "Specify issuing authority",
    
    label_perm_addr_group: "Permanent Address",
    helper_addr_merged_note: "ℹ️ Note on Administrative Mergers: Please declare according to the latest post-merger administrative divisions (as shown on VNeID / Citizen ID). Detail field must include all levels prior to Ward/Commune (house no., street, lane, hamlet).",
    label_addr_province: "Province / City",
    label_addr_ward: "Ward / Commune",
    label_addr_detail: "Detail before Ward/Commune (House no., street, hamlet)",
    
    label_curr_addr_group: "Current Residential Address (Actual Residence)",
    label_phone: "Contact Phone Number",
    label_email: "Personal Email",

    // Step 3
    step3_title: "Step 3: Job Information",
    step3_desc: "Please specify your agreed employment type and working time.",
    label_working_type: "Employment Type",
    label_working_time: "Working Duration",

    // Step 4
    step4_title: "Step 4: Education & Experience",
    step4_desc: "Declare your academic background and previous work history.",
    label_edu_level: "Highest Education Level",
    label_other_edu_level: "Other education level",
    label_school: "Graduated University / Institution",
    label_major: "Major / Field of Study",
    label_grad_year: "Graduation Year (yyyy)",
    label_exp_summary: "Work Experience Summary",
    label_no_exp: "I do not have previous work experience",
    th_from: "From (MM/YYYY)",
    th_to: "To (MM/YYYY)",
    th_company: "Company Name",
    th_position: "Job Title",
    th_tasks: "Key Responsibilities",
    th_action: "Delete",
    btn_add_exp: "Add Experience",
    label_edu_certs: "Education & Teaching Certificates",
    label_edu_exp_years: "Years of Experience in Education",
    label_living_abroad: "Living Abroad Duration",

    // Step 5
    step5_title: "Step 5: Tax, Insurance & Banking",
    step5_desc: "Information for payroll calculation and statutory benefits.",
    label_tax_id: "Personal Income Tax ID (MST)",
    label_social_insurance: "Social Insurance Book Number",
    helper_social_insurance: "If you have never enrolled in social insurance, fill 'None'.",
    label_health_place: "Initial Medical Registration Place",
    helper_health_place: "Lookup eligible clinics/hospitals at:",
    link_health_kcb: "List of qualified healthcare providers",
    label_bidv_account: "BIDV Bank Account (Thanh Xuan Branch)",
    label_other_bank: "Other Bank Account (Non-BIDV)",
    helper_other_bank: "Required: Account Holder - Bank Name - Account Number - Branch.",
    label_vehicle_info: "Vehicle Information (for campus parking)",
    helper_vehicle_info: "If you do not commute with a personal vehicle, enter 'None'.",

    // Step 6
    step6_title: "Step 6: Family Members & Dependents",
    step6_desc: "Declare immediate family members and designate 01 emergency contact.",
    label_family_table: "Family Members Information (Parents, Spouse, Children, Siblings)",
    th_fam_name: "Full Name",
    th_fam_birthyear: "Birth Year",
    th_fam_relation: "Relationship",
    th_fam_job: "Occupation",
    th_fam_workplace: "Workplace",
    th_fam_emergency: "Emergency?",
    btn_add_family: "Add Family Member",
    label_emergency_phone: "Emergency Contact Phone",
    label_has_dependents: "Do you register dependents for tax deduction?",
    th_dep_name: "Dependent Name",
    th_dep_birthyear: "Birth Year",
    th_dep_relation: "Relationship",
    th_dep_tax: "Dependent Tax Code",
    th_dep_effect: "Effective Month",
    btn_add_dependent: "Add Dependent",

    // Step 7
    step7_title: "Step 7: Attach Documents & Credentials",
    step7_desc: "Accepted formats: PDF, JPG, PNG, DOC, DOCX. Max file size: 15MB/file.",
    doc_photo_title: "Portrait Photo (3x4 or 4x6 cm)",
    doc_cccd_title: "Copy of Citizen ID Card / Passport",
    doc_syll_title: "Curriculum Vitae (SYLL)",
    doc_health_title: "Health Certificate",
    doc_vneid_title: "VNeID Residence Verification",
    doc_degree_title: "Degrees & Certificates",
    tag_mandatory: "Mandatory",
    tag_optional: "Optional",
    btn_choose_file: "Choose file...",
    status_no_file: "No file chosen",
    notice_first_day_title: "Important Notice on First Working Day:",
    notice_first_day_content: "On your first working day, please bring all original/notarized hard copies (Notarized copies: ID Card, Degree/Certificates; Original: CV, Health Certificate; Copy: VNeID residence confirmation; 02 portrait photos 4x6cm) to submit to the HR Department.",

    // Step 8
    step8_title: "Step 8: Review & Verify Information",
    step8_desc: "Please review all entered information carefully before proceeding to commitment.",
    btn_confirm_review: "Confirm & Proceed to Commitment",

    // Step 9
    step9_title: "Step 9: Commitment & Submission",
    step9_desc: "Legal declaration regarding the accuracy of submitted data & Personal Data Protection Policy.",
    
    company_privacy_title: "COMPANY'S COMMITMENT TO PERSONAL DATA PROTECTION",
    company_privacy_badge: "Compliance with Decree 13/2023/ND-CP",
    company_privacy_content: "The Company strictly commits that all personal data, files, and credentials provided by the employee are exclusively used for internal human resources administration, employment contract execution, statutory insurance, personal tax withholding, and payroll-related welfare. We strictly guarantee that your data will NEVER be shared, sold, or transferred to any third party for commercial purposes without your explicit consent.",
    
    commitment_header: "EMPLOYEE'S COMMITMENT",
    commitment_text: "\"I have thoroughly read the Company's Personal Data Protection Policy. I hereby declare and commit that all details provided above (especially post-merger residential addresses) are completely truthful and accurate. If there are any discrepancies compared to physical credentials, I take full responsibility before the Company and the law.\"",
    commitment_agree: "I have read, understood, and agree to the commitments above",
    btn_back_review: "Back to Review",
    btn_finish_submit: "Complete Submission",

    // Step 10
    success_title: "DECLARATION SUCCESSFUL",
    success_desc: "Thank you for completing your onboarding declaration.<br>All records and documents have been securely encrypted and stored on our system.",
    success_contact_hr: "Please prepare hard-copy documents as instructed to submit on your first working day.",

    // Modal Draft
    draft_modal_title: "Saved Draft Detected",
    draft_modal_desc: "The system found your previously saved onboarding form. Would you like to resume where you left off?",
    btn_draft_resume: "Restore & Continue",
    btn_draft_discard: "Start Fresh",

    // Buttons & General
    btn_home: "Home",
    btn_continue: "Continue",
    btn_back: "Back",
    btn_confirm_submit: "Confirm & Submit",
    modal_confirm_title: "Confirm Submission",
    modal_confirm_desc: "Please ensure all personal details and attached files are completely accurate. Do you confirm to submit now?",
    footer_title: "© Employee Onboarding Portal - HR Department (EDUCO)",
    footer_desc: "All submitted data is strictly protected under Decree 13/2023/ND-CP and used solely for human resources purposes.",

    // Dropdown Option Translations
    opt_select_prefix: "-- Select --",
    opt_select_prov: "-- Select Province / City --",
    opt_select_ward: "-- Select Ward / Commune --",
    opt_gender_male: "Male",
    opt_gender_female: "Female",
    opt_gender_other: "Other",
    opt_marital_single: "Single",
    opt_marital_married: "Married",
    opt_marital_divorced: "Divorced",
    opt_marital_other: "Other",
    opt_vietnam: "Vietnam",
    opt_other: "Other",
    opt_id_cccd: "Citizen Identity Card (12 digits) / ID Card",
    opt_id_passport: "Passport",
    opt_id_other: "Other (Legal travel/resident doc)",
    opt_place_c06: "Police Department of Administrative Management of Social Order (C06)",
    opt_place_c72: "Police Dept for Residence Registration & Nat. Pop. Data (C72)",
    opt_place_bca: "Ministry of Public Security",
    opt_place_other: "Other",
    opt_fulltime: "Full-time",
    opt_parttime: "Part-time",
    opt_time_ft: "Full-time (Standard)",
    opt_time_under1m: "Under 1 month",
    opt_time_over1m: "Over 1 month",
    opt_edu_postgrad: "Postgraduate (Master/PhD)",
    opt_edu_bachelor: "Bachelor's Degree",
    opt_edu_college: "Associate / College Degree",
    opt_edu_vocational: "Intermediate Vocational",
    opt_edu_elementary: "Elementary Vocational",
    opt_edu_highschool: "High School",
    opt_edu_cert: "Vocational Certificate",
    opt_edu_unskilled: "General Worker",
    opt_edu_other: "Other",
    opt_no: "No",
    opt_yes: "Yes",

    // Placeholders
    ph_fullname: "Enter full name (e.g., NGUYEN VAN A)",
    ph_other_gender: "Specify your gender",
    ph_pob_detail: "House no., street, lane (If any - optional)",
    ph_addr_detail: "House no., street, lane, hamlet (details prior to Ward)",
    ph_other_marital: "Specify marital status",
    ph_other_nationality: "Specify country name",
    ph_other_ethnicity: "Specify ethnicity",
    ph_other_religion: "Specify religion",
    ph_other_id_type: "e.g., Permanent / Temporary Card",
    ph_id_number: "Enter ID/Passport number",
    ph_other_id_issue_place: "Enter full issuing authority name",
    ph_phone: "e.g., 0912345678",
    ph_email: "e.g., nguyenvana@gmail.com",
    ph_other_edu_level: "Specify your education qualification",
    ph_school: "e.g., Hanoi National University of Education",
    ph_major: "e.g., English Pedagogy",
    ph_grad_year: "e.g., 2022",
    ph_edu_certs: "e.g., IELTS 7.5, TESOL 120h, Teaching license... (If none, type 'None')",
    ph_edu_exp_years: "e.g., 2.5",
    ph_living_abroad: "e.g., 2 years in Singapore (If none, type 'None')",
    ph_tax_id: "Enter Tax ID or type 'None'",
    ph_social_insurance: "Enter Insurance code or type 'None'",
    ph_health_place: "e.g., Dong Da General Hospital",
    ph_bidv_account: "e.g., 1234567890 - NGUYEN VAN A - THANH XUAN Branch (or 'None')",
    ph_other_bank: "e.g., NGUYEN VAN A - VIETCOMBANK - 1234567890 - Thang Long Branch",
    ph_vehicle_info: "Vehicle: Motorbike - Lead\nColor: White\nPlate: 29L1 - 01232",
    ph_emergency_phone: "Enter phone number of selected contact",

    // Callouts Content
    callout_tax_html: `
      <strong>Personal Income Tax ID Guide:</strong><br>
      1. Provide your correct Tax Code synchronized with your Citizen ID.<br>
      2. If you don't have one yet, enter <strong>"None"</strong> and download: 
      <a id="linkMstAuth" href="#" target="_blank">TAX ID AUTHORIZATION FORM</a> to submit on your first working day.
    `,
    callout_bidv_html: `
      <strong>BIDV Bank Account Guidelines:</strong><br>
      Structure: <code>Account Number - Account Holder - Branch</code><br>
      * Note: If you have a BIDV card outside Thanh Xuan Branch, fill <strong>"None"</strong> and download:
      <a id="linkBankAccount" href="#" target="_blank">NEW ACCOUNT OPENING FORM</a> for HR assistance.
    `,
    callout_dep_html: `
      Pursuant to: <a id="linkTt111" href="#" target="_blank">Article 9 Circular 111/2013/TT-BTC</a>.<br>
      Please download: <a id="linkNptForm" href="#" target="_blank">DEPENDENT REGISTRATION FORM</a> to submit verification files to HR.
    `
  }
};

// ========================================================================
// DROPDOWN DATA CONFIGURATION
// ========================================================================
const DROPDOWN_CONFIGS = {
  gender: [
    { val: "Nam", vi: "Nam", en: "Male" },
    { val: "Nữ", vi: "Nữ", en: "Female" },
    { val: "Khác", vi: "Khác", en: "Other" }
  ],
  maritalStatus: [
    { val: "Độc thân", vi: "Độc thân", en: "Single" },
    { val: "Đã kết hôn", vi: "Đã kết hôn", en: "Married" },
    { val: "Ly hôn", vi: "Ly hôn", en: "Divorced" },
    { val: "Khác", vi: "Khác", en: "Other" }
  ],
  nationality: [
    { val: "Việt Nam", vi: "Việt Nam", en: "Vietnam" },
    { val: "Khác", vi: "Khác", en: "Other" }
  ],
  idCardType: [
    { val: "Căn cước công dân / Thẻ Căn cước", vi: "Căn cước công dân (12 số) / Thẻ Căn cước", en: "Citizen Identity Card (12 digits) / ID Card" },
    { val: "Hộ chiếu", vi: "Hộ chiếu (Passport)", en: "Passport" },
    { val: "Khác", vi: "Khác (Hộ chiếu nước ngoài / Tạm trú...)", en: "Other (Foreign passport / Resident card...)" }
  ],
  idIssuePlace: [
    { val: "Cục Cảnh sát Quản lý Hành chính về Trật tự Xã hội", vi: "Cục Cảnh sát Quản lý Hành chính về Trật tự Xã hội", en: "Police Department of Administrative Management of Social Order (C06)" },
    { val: "Cục Cảnh sát Đăng ký quản lý Cư trú và Dữ liệu Quốc gia về Dân cư", vi: "Cục Cảnh sát Đăng ký quản lý Cư trú và Dữ liệu Quốc gia về Dân cư", en: "Police Dept for Residence Registration & Nat. Pop. Data (C72)" },
    { val: "Bộ Công an", vi: "Bộ Công an", en: "Ministry of Public Security" },
    { val: "Khác", vi: "Khác", en: "Other" }
  ],
  workingType: [
    { val: "Fulltime", vi: "Fulltime (Toàn thời gian)", en: "Full-time" },
    { val: "Parttime", vi: "Parttime (Bán thời gian)", en: "Part-time" }
  ],
  workingTime: [
    { val: "Toàn thời gian", vi: "Toàn thời gian", en: "Full-time (Standard)" },
    { val: "Dưới 1 tháng", vi: "Dưới 1 tháng", en: "Under 1 month" },
    { val: "Trên 1 tháng", vi: "Trên 1 tháng", en: "Over 1 month" }
  ],
  educationLevel: [
    { val: "Trên Đại học", vi: "Trên Đại học", en: "Postgraduate" },
    { val: "Đại học", vi: "Đại học", en: "Bachelor's Degree" },
    { val: "Cao đẳng", vi: "Cao đẳng", en: "Associate / College Degree" },
    { val: "Trung cấp", vi: "Trung cấp", en: "Intermediate Vocational" },
    { val: "Sơ cấp", vi: "Sơ cấp", en: "Elementary Vocational" },
    { val: "Phổ thông trung học", vi: "Phổ thông trung học", en: "High School" },
    { val: "Chứng chỉ nghề", vi: "Chứng chỉ nghề", en: "Vocational Certificate" },
    { val: "Lao động phổ thông", vi: "Lao động phổ thông", en: "General Worker" },
    { val: "Khác", vi: "Khác", en: "Other" }
  ],
  hasDependents: [
    { val: "Không", vi: "Không", en: "No" },
    { val: "Có", vi: "Có", en: "Yes" }
  ]
};

// ========================================================================
// LANGUAGE CONTROLLER
// ========================================================================
function setLanguage(lang) {
  APP_STATE.lang = lang;
  
  document.getElementById('btnLangVi').classList.toggle('active', lang === 'vi');
  document.getElementById('btnLangEn').classList.toggle('active', lang === 'en');

  const dict = I18N_DICT[lang] || I18N_DICT['vi'];

  // 1. Text nội dung tĩnh [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  // 2. Toàn bộ placeholder [data-i18n-ph]
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  // 3. Nội dung Callout
  renderCallouts(dict);

  // 4. Render lại toàn bộ Dropdown theo ngôn ngữ
  renderAllDropdowns();
  populateAddressDropdowns();

  // 5. Cập nhật Badge trên Header
  if (APP_STATE.currentStep > 0 && APP_STATE.currentStep < 10) {
    document.getElementById('headerStepBadge').textContent = `${dict.step_badge_prefix} ${APP_STATE.currentStep}/9`;
  }

  // 6. Cập nhật thẻ trạng thái hồ sơ
  updateUploadRequirements();
}

function renderCallouts(dict) {
  const taxBox = document.getElementById('calloutTaxBox');
  if (taxBox) taxBox.innerHTML = dict.callout_tax_html;

  const bidvBox = document.getElementById('calloutBidvBox');
  if (bidvBox) bidvBox.innerHTML = dict.callout_bidv_html;

  const depBox = document.getElementById('calloutDepBox');
  if (depBox) depBox.innerHTML = dict.callout_dep_html;

  rebindDynamicLinks();
}

function rebindDynamicLinks() {
  if (APP_STATE.links.mst_auth) {
    const el = document.getElementById('linkMstAuth');
    if (el) el.href = APP_STATE.links.mst_auth;
  }
  if (APP_STATE.links.bank_account) {
    const el = document.getElementById('linkBankAccount');
    if (el) el.href = APP_STATE.links.bank_account;
  }
  if (APP_STATE.links.tt111_art9) {
    const el = document.getElementById('linkTt111');
    if (el) el.href = APP_STATE.links.tt111_art9;
  }
  if (APP_STATE.links.npt_form) {
    const el = document.getElementById('linkNptForm');
    if (el) el.href = APP_STATE.links.npt_form;
  }
}

function renderAllDropdowns() {
  const lang = APP_STATE.lang;
  const dict = I18N_DICT[lang] || I18N_DICT['vi'];

  for (const [id, options] of Object.entries(DROPDOWN_CONFIGS)) {
    const select = document.getElementById(id);
    if (!select) continue;
    const currentVal = select.value;

    let html = '';
    if (id !== 'nationality' && id !== 'workingType' && id !== 'workingTime' && id !== 'hasDependents') {
      html += `<option value="">${dict.opt_select_prefix}</option>`;
    }

    options.forEach(opt => {
      const selected = (opt.val === currentVal) ? 'selected' : '';
      html += `<option value="${opt.val}" ${selected}>${opt[lang] || opt.vi}</option>`;
    });
    select.innerHTML = html;
  }

  // Dân tộc
  const ethSelect = document.getElementById('ethnicity');
  if (ethSelect) {
    const currentEth = ethSelect.value;
    let ethHtml = `<option value="">${dict.opt_select_prefix}</option>`;
    ETHNIC_GROUPS.forEach(e => {
      const sel = (e === currentEth) ? 'selected' : '';
      ethHtml += `<option value="${e}" ${sel}>${e}</option>`;
    });
    ethHtml += `<option value="Khác" ${currentEth === 'Khác' ? 'selected' : ''}>${dict.opt_other}</option>`;
    ethSelect.innerHTML = ethHtml;
  }

  // Tôn giáo
  const relSelect = document.getElementById('religion');
  if (relSelect) {
    const currentRel = relSelect.value;
    let relHtml = `<option value="">${dict.opt_select_prefix}</option>`;
    RELIGIONS.forEach(r => {
      const sel = (r === currentRel) ? 'selected' : '';
      relHtml += `<option value="${r}" ${sel}>${r}</option>`;
    });
    relHtml += `<option value="Khác" ${currentRel === 'Khác' ? 'selected' : ''}>${dict.opt_other}</option>`;
    relSelect.innerHTML = relHtml;
  }
}

// ========================================================================
// ADDRESS HIERARCHICAL POPULATOR (PROVINCE -> WARD)
// ========================================================================
function populateAddressDropdowns() {
  const dict = I18N_DICT[APP_STATE.lang] || I18N_DICT['vi'];
  const provSelects = ['pobProvince', 'permProvince', 'currProvince'];

  provSelects.forEach(selId => {
    const select = document.getElementById(selId);
    if (!select) return;
    const currentVal = select.value;

    let html = `<option value="">${dict.opt_select_prov}</option>`;
    APP_STATE.provinces.forEach(prov => {
      const sel = (prov === currentVal) ? 'selected' : '';
      html += `<option value="${prov}" ${sel}>${prov}</option>`;
    });
    select.innerHTML = html;
  });
}

function onProvinceChange(type) {
  const dict = I18N_DICT[APP_STATE.lang] || I18N_DICT['vi'];
  const provSelect = document.getElementById(type + 'Province');
  const wardSelect = document.getElementById(type + 'Ward');
  if (!provSelect || !wardSelect) return;

  const selectedProv = provSelect.value;
  wardSelect.innerHTML = `<option value="">${dict.opt_select_ward}</option>`;

  if (!selectedProv || !APP_STATE.addressTree[selectedProv]) {
    wardSelect.disabled = true;
    return;
  }

  wardSelect.disabled = false;
  const wards = APP_STATE.addressTree[selectedProv] || [];
  let html = `<option value="">${dict.opt_select_ward}</option>`;
  wards.forEach(w => {
    html += `<option value="${w}">${w}</option>`;
  });
  wardSelect.innerHTML = html;
}

// ========================================================================
// "KHÁC" (OTHER) DROPDOWN CONTROLLER
// ========================================================================
function handleDropdownWithCustom(selectElement, customGroupId) {
  const customGroup = document.getElementById(customGroupId);
  if (!customGroup) return;

  if (selectElement.value === 'Khác') {
    customGroup.style.display = 'block';
    const input = customGroup.querySelector('input');
    if (input) input.focus();
  } else {
    customGroup.style.display = 'none';
    const input = customGroup.querySelector('input');
    if (input) input.value = '';
  }
}

// ========================================================================
// LOGO RESILIENCE CONTROLLER (Bypass Google Drive Hotlink blocks on Vercel)
// ========================================================================
function setupBrandLogos() {
  const headerImg = document.getElementById('headerLogo');
  const welcomeImg = document.getElementById('welcomeLogo');
  
  const setupImg = (imgEl, badgeId) => {
    if (!imgEl) return;
    imgEl.referrerPolicy = 'no-referrer';
    imgEl.crossOrigin = 'anonymous';

    // Đặt link ảnh trực tiếp
    imgEl.src = COMPANY_LOGO_URL;

    imgEl.onerror = function() {
      // Thử thumbnail link
      const fallbackUrl = 'https://drive.google.com/thumbnail?id=1EOrZkL2UB4usQqZg1viwBUlgguX9Fj1V&sz=w500';
      if (imgEl.src !== fallbackUrl) {
        imgEl.src = fallbackUrl;
      } else {
        // Nếu vẫn không được hiển thị Huy hiệu vector cao cấp thay thế
        imgEl.style.display = 'none';
        const badge = document.getElementById(badgeId);
        if (badge) badge.style.display = 'flex';
      }
    };
  };

  setupImg(headerImg, 'headerBrandBadge');
  setupImg(welcomeImg, 'welcomeBrandBadge');
}

// ========================================================================
// LIFECYCLE HOOKS (INIT)
// ========================================================================
document.addEventListener('DOMContentLoaded', function() {
  setupBrandLogos();
  setLanguage('vi');
  addExperienceRow();
  addFamilyRow();

  // Tải dữ liệu từ GAS (Bao gồm Links & Danh mục Address Tỉnh/Phường)
  loadInitialSystemData();

  checkAndPromptDraftModal();
  updateUploadRequirements();
});

async function loadInitialSystemData() {
  if (!GAS_API_URL || GAS_API_URL.includes('DÁN_LINK')) {
    console.warn('Vui lòng cấu hình GAS_API_URL trong app.js');
    return;
  }

  showLoading('Đang kết nối cấu hình hệ thống & nạp danh mục địa chỉ...');
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'GET',
      mode: 'cors'
    });
    const result = await response.json();
    hideLoading();

    if (result && result.success) {
      APP_STATE.links = result.data.links || {};
      APP_STATE.addressTree = result.data.addressTree || {};
      APP_STATE.provinces = result.data.provinces || Object.keys(APP_STATE.addressTree);

      rebindDynamicLinks();
      populateAddressDropdowns();

      // Nếu có draft pending, đồng bộ lại địa chỉ sau khi nạp danh mục xong
      if (APP_STATE.pendingDraftData) {
        restoreDraftAddressFields(APP_STATE.pendingDraftData);
      }
    } else {
      showToast('Lỗi tải cấu hình: ' + (result ? result.error : 'Không phản hồi'), 'error');
    }
  } catch (err) {
    hideLoading();
    showToast('Lỗi kết nối máy chủ: ' + err.toString(), 'error');
  }
}

function onWorkingTypeChange(type) {
  const workingTimeSelect = document.getElementById('workingTime');
  if (type === 'Fulltime') {
    workingTimeSelect.value = 'Toàn thời gian';
  } else {
    workingTimeSelect.value = 'Trên 1 tháng';
  }
  updateUploadRequirements();
}

function updateUploadRequirements() {
  const workingType = document.getElementById('workingType').value;
  const workingTime = document.getElementById('workingTime').value;
  const isParttimeUnder1M = (workingType === 'Parttime' && workingTime === 'Dưới 1 tháng');
  const standardRequired = !isParttimeUnder1M;

  const lang = APP_STATE.lang;
  const dict = I18N_DICT[lang] || I18N_DICT['vi'];

  // Ảnh thẻ và CCCD: Luôn luôn Bắt buộc
  ['Anh_the', 'CCCD'].forEach(doc => {
    const tag = document.getElementById('tag_' + doc);
    if (tag) {
      tag.textContent = dict.tag_mandatory;
      tag.className = 'upload-req-tag req-tag-mandatory';
    }
  });

  // Các giấy tờ khác
  const otherDocs = ['SYLL', 'Giay_kham_suc_khoe', 'Xac_thuc_cu_tru_VNEID', 'Bang_cap'];
  otherDocs.forEach(type => {
    const tag = document.getElementById('tag_' + type);
    if (tag) {
      if (standardRequired) {
        tag.textContent = dict.tag_mandatory;
        tag.className = 'upload-req-tag req-tag-mandatory';
      } else {
        tag.textContent = dict.tag_optional;
        tag.className = 'upload-req-tag req-tag-optional';
      }
    }
  });
}

// ========================================================================
// DYNAMIC TABLE LOGIC (EXPERIENCE, FAMILY, DEPENDENTS)
// ========================================================================
function toggleNoExperience(checked) {
  const wrapper = document.getElementById('experienceWrapper');
  const btnAdd = document.getElementById('btnAddExp');
  if (checked) {
    wrapper.style.opacity = '0.5';
    wrapper.style.pointerEvents = 'none';
    btnAdd.disabled = true;
  } else {
    wrapper.style.opacity = '1';
    wrapper.style.pointerEvents = 'auto';
    btnAdd.disabled = false;
  }
}

function addExperienceRow(data = {}) {
  const tbody = document.getElementById('experienceTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="table-input exp-from" placeholder="01/2022" value="${data.from || ''}"></td>
    <td><input type="text" class="table-input exp-to" placeholder="05/2023" value="${data.to || ''}"></td>
    <td><input type="text" class="table-input exp-company" placeholder="Tên đơn vị / Company" value="${data.company || ''}"></td>
    <td><input type="text" class="table-input exp-title" placeholder="Chức danh / Role" value="${data.title || ''}"></td>
    <td><input type="text" class="table-input exp-tasks" placeholder="Mô tả công việc / Tasks" value="${data.tasks || ''}"></td>
    <td style="text-align: center;"><button type="button" class="btn-action-del" onclick="this.closest('tr').remove()">Xóa</button></td>
  `;
  tbody.appendChild(tr);
}

function addFamilyRow(data = {}) {
  const tbody = document.getElementById('familyTableBody');
  const tr = document.createElement('tr');
  const rowId = 'fam_' + Date.now() + '_' + Math.floor(Math.random()*1000);
  tr.setAttribute('data-id', rowId);

  tr.innerHTML = `
    <td><input type="text" class="table-input fam-name" placeholder="Họ và tên / Full Name" value="${data.name || ''}" oninput="syncEmergencyRadio('${rowId}')"></td>
    <td><input type="number" class="table-input fam-year" placeholder="1965" value="${data.birthYear || ''}"></td>
    <td><input type="text" class="table-input fam-rel" placeholder="Bố/Mẹ/Vợ/Chồng..." value="${data.relation || ''}" oninput="syncEmergencyRadio('${rowId}')"></td>
    <td><input type="text" class="table-input fam-job" placeholder="Nghề nghiệp / Job" value="${data.job || ''}"></td>
    <td><input type="text" class="table-input fam-workplace" placeholder="Nơi công tác / Workplace" value="${data.workplace || ''}"></td>
    <td style="text-align: center;">
      <input type="radio" name="emergencyRadio" value="${rowId}" onchange="selectEmergencyContact('${rowId}')">
    </td>
    <td style="text-align: center;"><button type="button" class="btn-action-del" onclick="removeFamilyRow(this, '${rowId}')">Xóa</button></td>
  `;
  tbody.appendChild(tr);
}

function removeFamilyRow(btn, rowId) {
  btn.closest('tr').remove();
  if (APP_STATE.emergencyContactPerson && APP_STATE.emergencyContactPerson.rowId === rowId) {
    APP_STATE.emergencyContactPerson = null;
    document.getElementById('emergencyPhoneBox').style.display = 'none';
    document.getElementById('emergencyPhone').value = '';
  }
}

function selectEmergencyContact(rowId) {
  const tr = document.querySelector(`tr[data-id="${rowId}"]`);
  if (!tr) return;

  const name = tr.querySelector('.fam-name').value.trim();
  const relation = tr.querySelector('.fam-rel').value.trim();

  APP_STATE.emergencyContactPerson = { rowId, name, relation };
  const box = document.getElementById('emergencyPhoneBox');
  const lbl = document.getElementById('lblEmergencyPerson');
  
  lbl.textContent = (relation ? relation + ' (' : '') + (name || 'Thân nhân') + (relation ? ')' : '');
  box.style.display = 'block';
}

function syncEmergencyRadio(rowId) {
  if (APP_STATE.emergencyContactPerson && APP_STATE.emergencyContactPerson.rowId === rowId) {
    selectEmergencyContact(rowId);
  }
}

function toggleDependents(val) {
  document.getElementById('dependentSection').style.display = (val === 'Có') ? 'block' : 'none';
  if (val === 'Có' && document.getElementById('dependentTableBody').children.length === 0) {
    addDependentRow();
  }
}

function addDependentRow(data = {}) {
  const tbody = document.getElementById('dependentTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="table-input dep-name" placeholder="Họ tên NPT" value="${data.name || ''}"></td>
    <td><input type="number" class="table-input dep-year" placeholder="2015" value="${data.birthYear || ''}"></td>
    <td><input type="text" class="table-input dep-rel" placeholder="Con / Cha / Mẹ" value="${data.relation || ''}"></td>
    <td><input type="text" class="table-input dep-mst" placeholder="MST NPT (nếu có)" value="${data.mst || ''}"></td>
    <td><input type="text" class="table-input dep-time" placeholder="VD: 07/2025" value="${data.effectiveDate || ''}"></td>
    <td style="text-align: center;"><button type="button" class="btn-action-del" onclick="this.closest('tr').remove()">Xóa</button></td>
  `;
  tbody.appendChild(tr);
}

// ========================================================================
// FILE UPLOAD HANDLING (BASE64)
// ========================================================================
function handleFileSelected(docType, fileInput) {
  if (!fileInput.files || fileInput.files.length === 0) return;
  const file = fileInput.files[0];

  if (file.size > 15 * 1024 * 1024) {
    showToast(APP_STATE.lang === 'en' ? 'File too large! Must be under 15MB.' : 'Tệp quá lớn! Vui lòng chọn tệp nhỏ hơn 15MB.', 'error');
    fileInput.value = '';
    return;
  }

  showLoading(APP_STATE.lang === 'en' ? 'Processing file: ' + file.name : 'Đang xử lý tệp: ' + file.name);

  const reader = new FileReader();
  reader.onload = function(e) {
    hideLoading();
    const base64String = e.target.result.split(',')[1];
    APP_STATE.uploadedFilesData[docType] = {
      docType: docType,
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      base64Data: base64String,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    };

    const card = document.getElementById('card_' + docType);
    const status = document.getElementById('status_' + docType);
    if (card) card.classList.add('has-file');
    if (status) {
      status.innerHTML = `✓ <strong>${file.name}</strong> (${APP_STATE.uploadedFilesData[docType].fileSize}) <a href="javascript:void(0)" style="color:var(--accent-rose); margin-left:8px;" onclick="removeFile('${docType}')">[Xóa/Del]</a>`;
    }
    showToast(APP_STATE.lang === 'en' ? 'Uploaded: ' + file.name : 'Đã chọn tệp: ' + file.name, 'success');
  };
  reader.onerror = function() {
    hideLoading();
    showToast(APP_STATE.lang === 'en' ? 'Cannot read selected file!' : 'Không thể đọc file đã chọn!', 'error');
  };
  reader.readAsDataURL(file);
}

function removeFile(docType) {
  delete APP_STATE.uploadedFilesData[docType];
  const fileInput = document.getElementById('file_' + docType);
  if (fileInput) fileInput.value = '';

  const card = document.getElementById('card_' + docType);
  const status = document.getElementById('status_' + docType);
  if (card) card.classList.remove('has-file');
  if (status) status.textContent = APP_STATE.lang === 'en' ? 'No file chosen' : 'Chưa chọn tệp';
}

// ========================================================================
// NAVIGATION & STEP CONTROLLER
// ========================================================================
function goToStep(stepIndex) {
  if (stepIndex < 0 || stepIndex > 10) return;

  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));

  const targetStep = document.getElementById('step-' + stepIndex);
  if (targetStep) targetStep.classList.add('active');

  APP_STATE.currentStep = stepIndex;

  const headerBadge = document.getElementById('headerStepBadge');
  const progressContainer = document.getElementById('progressBarContainer');
  const dict = I18N_DICT[APP_STATE.lang] || I18N_DICT['vi'];

  if (stepIndex === 0 || stepIndex === 10) {
    headerBadge.style.display = 'none';
    progressContainer.style.display = 'none';
  } else {
    headerBadge.style.display = 'block';
    headerBadge.textContent = `${dict.step_badge_prefix} ${stepIndex}/9`;
    progressContainer.style.display = 'block';

    document.querySelectorAll('.step-node').forEach(node => {
      const s = parseInt(node.getAttribute('data-step'));
      node.classList.remove('active', 'completed');
      if (s === stepIndex) {
        node.classList.add('active');
      } else if (s < stepIndex) {
        node.classList.add('completed');
      }
    });

    const percent = ((stepIndex - 1) / 8) * 100;
    document.getElementById('timelineProgress').style.width = percent + '%';
  }

  if (stepIndex === 8) {
    renderReviewData();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveDraftToLocalStorage();
}

function validateAndGo(currentStep, nextStep) {
  if (validateStep(currentStep)) {
    goToStep(nextStep);
  }
}

// ========================================================================
// FRONTEND STEP VALIDATION
// ========================================================================
function validateStep(step) {
  const isEn = (APP_STATE.lang === 'en');

  if (step === 1) {
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 2) {
      showToast(isEn ? 'Please enter your full name.' : 'Vui lòng nhập họ và tên đầy đủ.', 'error');
      document.getElementById('fullName').focus();
      return false;
    }
    if (!document.getElementById('gender').value) {
      showToast(isEn ? 'Please select gender.' : 'Vui lòng chọn giới tính.', 'error');
      return false;
    }
    if (document.getElementById('gender').value === 'Khác' && !document.getElementById('otherGender').value.trim()) {
      showToast(isEn ? 'Please specify your gender.' : 'Vui lòng nhập thông tin giới tính của bạn.', 'error');
      document.getElementById('otherGender').focus();
      return false;
    }
    if (!document.getElementById('dob').value) {
      showToast(isEn ? 'Please select date of birth.' : 'Vui lòng chọn ngày sinh.', 'error');
      return false;
    }
    
    // Nơi sinh / Quê quán: Tỉnh + Phường bắt buộc, chi tiết không bắt buộc
    if (!document.getElementById('pobProvince').value) {
      showToast(isEn ? 'Please select Birth Place Province/City.' : 'Vui lòng chọn Tỉnh/Thành phố nơi đăng ký khai sinh/quê quán.', 'error');
      document.getElementById('pobProvince').focus();
      return false;
    }
    if (!document.getElementById('pobWard').value) {
      showToast(isEn ? 'Please select Birth Place Ward/Commune.' : 'Vui lòng chọn Phường/Xã nơi đăng ký khai sinh/quê quán.', 'error');
      document.getElementById('pobWard').focus();
      return false;
    }

    if (!document.getElementById('maritalStatus').value) {
      showToast(isEn ? 'Please select marital status.' : 'Vui lòng chọn tình trạng hôn nhân.', 'error');
      return false;
    }
    if (document.getElementById('maritalStatus').value === 'Khác' && !document.getElementById('otherMarital').value.trim()) {
      showToast(isEn ? 'Please specify your marital status.' : 'Vui lòng nhập tình trạng hôn nhân cụ thể.', 'error');
      document.getElementById('otherMarital').focus();
      return false;
    }
    if (document.getElementById('nationality').value === 'Khác' && !document.getElementById('otherNationality').value.trim()) {
      showToast(isEn ? 'Please specify your nationality.' : 'Vui lòng nhập quốc tịch cụ thể.', 'error');
      document.getElementById('otherNationality').focus();
      return false;
    }
    if (!document.getElementById('ethnicity').value) {
      showToast(isEn ? 'Please select ethnicity.' : 'Vui lòng chọn dân tộc.', 'error');
      return false;
    }
    if (document.getElementById('ethnicity').value === 'Khác' && !document.getElementById('otherEthnicity').value.trim()) {
      showToast(isEn ? 'Please specify your ethnicity.' : 'Vui lòng nhập tên dân tộc cụ thể.', 'error');
      document.getElementById('otherEthnicity').focus();
      return false;
    }
    if (!document.getElementById('religion').value) {
      showToast(isEn ? 'Please select religion.' : 'Vui lòng chọn tôn giáo.', 'error');
      return false;
    }
    if (document.getElementById('religion').value === 'Khác' && !document.getElementById('otherReligion').value.trim()) {
      showToast(isEn ? 'Please specify your religion.' : 'Vui lòng nhập tên tôn giáo cụ thể.', 'error');
      document.getElementById('otherReligion').focus();
      return false;
    }
    return true;
  }

  if (step === 2) {
    if (!document.getElementById('idCardType').value) {
      showToast(isEn ? 'Please select ID document type.' : 'Vui lòng chọn loại thẻ định danh.', 'error');
      return false;
    }
    if (document.getElementById('idCardType').value === 'Khác' && !document.getElementById('otherIdCardType').value.trim()) {
      showToast(isEn ? 'Please specify your ID card type.' : 'Vui lòng nhập loại thẻ định danh cụ thể.', 'error');
      return false;
    }
    const idNum = document.getElementById('idNumber').value.trim();
    if (!/^[0-9A-Za-z]{8,20}$/.test(idNum)) {
      showToast(isEn ? 'Invalid ID number.' : 'Số thẻ định danh không hợp lệ.', 'error');
      document.getElementById('idNumber').focus();
      return false;
    }
    if (!document.getElementById('idIssueDate').value) {
      showToast(isEn ? 'Please choose ID issue date.' : 'Vui lòng chọn ngày cấp thẻ.', 'error');
      return false;
    }
    if (!document.getElementById('idExpiryDate').value) {
      showToast(isEn ? 'Please choose ID expiry date.' : 'Vui lòng chọn ngày hết hạn thẻ.', 'error');
      return false;
    }
    if (document.getElementById('idIssuePlace').value === 'Khác' && !document.getElementById('otherIdIssuePlace').value.trim()) {
      showToast(isEn ? 'Please specify issuing place.' : 'Vui lòng nhập cơ quan cấp thẻ.', 'error');
      return false;
    }

    // Thường trú: Tỉnh + Phường + Chi tiết (Bắt buộc)
    if (!document.getElementById('permProvince').value) {
      showToast(isEn ? 'Please select Permanent Address Province.' : 'Vui lòng chọn Tỉnh/Thành phố thường trú.', 'error');
      return false;
    }
    if (!document.getElementById('permWard').value) {
      showToast(isEn ? 'Please select Permanent Address Ward.' : 'Vui lòng chọn Phường/Xã thường trú.', 'error');
      return false;
    }
    if (!document.getElementById('permDetail').value.trim()) {
      showToast(isEn ? 'Please enter detailed permanent address before Ward/Commune.' : 'Vui lòng nhập địa chỉ chi tiết trước Phường/Xã của Hộ khẩu thường trú.', 'error');
      document.getElementById('permDetail').focus();
      return false;
    }

    // Nơi ở hiện tại: Tỉnh + Phường + Chi tiết (Bắt buộc)
    if (!document.getElementById('currProvince').value) {
      showToast(isEn ? 'Please select Current Address Province.' : 'Vui lòng chọn Tỉnh/Thành phố nơi ở hiện tại.', 'error');
      return false;
    }
    if (!document.getElementById('currWard').value) {
      showToast(isEn ? 'Please select Current Address Ward.' : 'Vui lòng chọn Phường/Xã nơi ở hiện tại.', 'error');
      return false;
    }
    if (!document.getElementById('currDetail').value.trim()) {
      showToast(isEn ? 'Please enter detailed current address before Ward/Commune.' : 'Vui lòng nhập địa chỉ chi tiết trước Phường/Xã của nơi ở hiện tại.', 'error');
      document.getElementById('currDetail').focus();
      return false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (!/^(0|\+84)[0-9]{9}$/.test(phone)) {
      showToast(isEn ? 'Invalid Vietnam phone number format (10 digits).' : 'Số điện thoại chưa đúng định dạng số Việt Nam (10 số).', 'error');
      return false;
    }
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast(isEn ? 'Invalid email address.' : 'Email chưa đúng định dạng.', 'error');
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (!document.getElementById('workingType').value) {
      showToast(isEn ? 'Please select employment type.' : 'Vui lòng chọn hình thức làm việc.', 'error');
      return false;
    }
    if (!document.getElementById('workingTime').value) {
      showToast(isEn ? 'Please select working duration.' : 'Vui lòng chọn thời gian làm việc.', 'error');
      return false;
    }
    return true;
  }

  if (step === 4) {
    if (!document.getElementById('educationLevel').value) {
      showToast(isEn ? 'Please select highest education level.' : 'Vui lòng chọn trình độ học vấn cao nhất.', 'error');
      return false;
    }
    if (document.getElementById('educationLevel').value === 'Khác' && !document.getElementById('otherEducationLevel').value.trim()) {
      showToast(isEn ? 'Please specify your education level.' : 'Vui lòng nhập trình độ học vấn cụ thể.', 'error');
      return false;
    }
    if (!document.getElementById('school').value.trim()) {
      showToast(isEn ? 'Please enter graduated school/university.' : 'Vui lòng nhập trường học/cơ sở tốt nghiệp.', 'error');
      return false;
    }
    if (!document.getElementById('major').value.trim()) {
      showToast(isEn ? 'Please enter your major.' : 'Vui lòng nhập chuyên ngành.', 'error');
      return false;
    }
    const y = parseInt(document.getElementById('gradYear').value);
    if (isNaN(y) || y < 1950 || y > 2035) {
      showToast(isEn ? 'Invalid graduation year.' : 'Năm tốt nghiệp không hợp lệ.', 'error');
      return false;
    }
    return true;
  }

  if (step === 5) {
    if (!document.getElementById('taxId').value.trim()) {
      showToast(isEn ? 'Please enter Personal Tax Code or "None".' : 'Vui lòng nhập Mã số thuế TNCN hoặc "Chưa có".', 'error');
      return false;
    }
    if (!document.getElementById('socialInsuranceId').value.trim()) {
      showToast(isEn ? 'Please enter Social Insurance ID or "None".' : 'Vui lòng nhập Số sổ BHXH hoặc "Chưa có".', 'error');
      return false;
    }
    return true;
  }

  if (step === 6) {
    const famRows = document.querySelectorAll('#familyTableBody tr');
    if (famRows.length === 0) {
      showToast(isEn ? 'Please enter at least one family member.' : 'Vui lòng cung cấp thông tin ít nhất một người thân.', 'error');
      return false;
    }
    if (!APP_STATE.emergencyContactPerson) {
      showToast(isEn ? 'Please tick 01 emergency contact in family table.' : 'Vui lòng tích chọn đúng 01 người liên lạc khẩn cấp trong bảng người thân.', 'error');
      return false;
    }
    const emPhone = document.getElementById('emergencyPhone').value.trim();
    if (!emPhone || !/^(0|\+84)[0-9]{9}$/.test(emPhone)) {
      showToast(isEn ? 'Invalid emergency phone number.' : 'Vui lòng nhập số điện thoại khẩn cấp hợp lệ của người thân được chọn.', 'error');
      return false;
    }
    return true;
  }

  if (step === 7) {
    const workingType = document.getElementById('workingType').value;
    const workingTime = document.getElementById('workingTime').value;
    const isParttimeUnder1M = (workingType === 'Parttime' && workingTime === 'Dưới 1 tháng');

    if (!APP_STATE.uploadedFilesData['Anh_the']) {
      showToast(isEn ? 'Portrait photo is mandatory for all applicants.' : 'Bạn chưa tải hồ sơ: Ảnh thẻ chân dung (Bắt buộc với tất cả nhân sự).', 'error');
      return false;
    }

    if (!APP_STATE.uploadedFilesData['CCCD']) {
      showToast(isEn ? 'ID Card / Passport copy is mandatory.' : 'Bạn chưa tải hồ sơ: Bản sao CCCD / Thẻ Căn cước (Bắt buộc).', 'error');
      return false;
    }

    if (!isParttimeUnder1M) {
      const reqs = [
        { type: 'SYLL', name: isEn ? 'Curriculum Vitae (SYLL)' : 'Sơ yếu lý lịch' },
        { type: 'Giay_kham_suc_khoe', name: isEn ? 'Health Certificate' : 'Giấy khám sức khỏe' },
        { type: 'Xac_thuc_cu_tru_VNEID', name: isEn ? 'VNeID Residence Verification' : 'Xác thực cư trú VNeID' },
        { type: 'Bang_cap', name: isEn ? 'Degrees & Credentials' : 'Bằng cấp chuyên môn' }
      ];
      for (var i = 0; i < reqs.length; i++) {
        if (!APP_STATE.uploadedFilesData[reqs[i].type]) {
          showToast((isEn ? 'Missing mandatory document: ' : 'Bạn chưa tải hồ sơ bắt buộc: ') + reqs[i].name, 'error');
          return false;
        }
      }
    }
    return true;
  }

  return true;
}

// ========================================================================
// FORMAT ADDRESS STRING
// ========================================================================
function buildFullAddress(detail, ward, province) {
  const parts = [];
  if (detail && detail.trim()) parts.push(detail.trim());
  if (ward && ward.trim()) parts.push(ward.trim());
  if (province && province.trim()) parts.push(province.trim());
  return parts.join(', ');
}

// ========================================================================
// REVIEW SCREEN RENDERING
// ========================================================================
function renderReviewData() {
  const container = document.getElementById('reviewContainer');
  const payload = collectFormData();
  const isEn = (APP_STATE.lang === 'en');

  container.innerHTML = `
    <!-- 1: Cá nhân -->
    <div class="review-section">
      <div class="review-header">
        <h4>1. ${isEn ? 'Personal Information' : 'Thông tin cá nhân'}</h4>
        <button type="button" class="btn-edit-jump" onclick="goToStep(1)">${isEn ? 'Edit' : 'Chỉnh sửa'}</button>
      </div>
      <div class="review-body">
        <div class="review-item"><span class="review-label">${isEn ? 'Full Name' : 'Họ và tên'}</span><span class="review-value">${payload.fullName}</span></div>
        <div class="review-item"><span class="review-label">${isEn ? 'Gender / DOB' : 'Giới tính / Ngày sinh'}</span><span class="review-value">${payload.gender} - ${payload.dob}</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Place of Birth Registration / Native Place' : 'Nơi ĐK khai sinh / Quê quán (sau sáp nhập)'}</span><span class="review-value">${payload.pob}</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Marital / Nationality / Ethnicity' : 'Hôn nhân / Quốc tịch / Dân tộc'}</span><span class="review-value">${payload.maritalStatus} - ${payload.nationality} - ${payload.ethnicity}</span></div>
      </div>
    </div>

    <!-- 2: Định danh & Địa chỉ -->
    <div class="review-section">
      <div class="review-header">
        <h4>2. ${isEn ? 'Identification & Contact' : 'Định danh & Liên lạc'}</h4>
        <button type="button" class="btn-edit-jump" onclick="goToStep(2)">${isEn ? 'Edit' : 'Chỉnh sửa'}</button>
      </div>
      <div class="review-body">
        <div class="review-item"><span class="review-label">${isEn ? 'ID Type / Number' : 'Loại thẻ / Số thẻ'}</span><span class="review-value">${payload.idCardType} - ${payload.idNumber}</span></div>
        <div class="review-item"><span class="review-label">${isEn ? 'Issue Date / Place' : 'Ngày cấp / Nơi cấp'}</span><span class="review-value">${payload.idIssueDate} (${payload.idIssuePlace})</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Permanent Address (Post-merger)' : 'Hộ khẩu thường trú (Sau sáp nhập)'}</span><span class="review-value">${payload.permanentAddress}</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Current Residential Address (Post-merger)' : 'Nơi ở hiện tại (Sau sáp nhập)'}</span><span class="review-value">${payload.currentAddress}</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Phone / Email' : 'SĐT / Email'}</span><span class="review-value">${payload.phone} - ${payload.email}</span></div>
      </div>
    </div>

    <!-- 3: Công việc -->
    <div class="review-section">
      <div class="review-header">
        <h4>3. ${isEn ? 'Job Information' : 'Thông tin công việc'}</h4>
        <button type="button" class="btn-edit-jump" onclick="goToStep(3)">${isEn ? 'Edit' : 'Chỉnh sửa'}</button>
      </div>
      <div class="review-body">
        <div class="review-item"><span class="review-label">${isEn ? 'Employment Type' : 'Hình thức làm việc'}</span><span class="review-value">${payload.workingType}</span></div>
        <div class="review-item"><span class="review-label">${isEn ? 'Working Duration' : 'Thời gian làm việc'}</span><span class="review-value">${payload.workingTime}</span></div>
      </div>
    </div>

    <!-- 4: Học vấn & Kinh nghiệm -->
    <div class="review-section">
      <div class="review-header">
        <h4>4. ${isEn ? 'Education & Experience' : 'Học vấn & Kinh nghiệm'}</h4>
        <button type="button" class="btn-edit-jump" onclick="goToStep(4)">${isEn ? 'Edit' : 'Chỉnh sửa'}</button>
      </div>
      <div class="review-body">
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Education Level / Major' : 'Trình độ / Trường / Ngành'}</span><span class="review-value">${payload.educationLevel} - ${payload.school} (${payload.major}) - ${payload.gradYear}</span></div>
        <div class="review-item col-span-2"><span class="review-label">${isEn ? 'Work Experience' : 'Kinh nghiệm'}</span><span class="review-value">${payload.noExperience ? (isEn ? 'No previous experience' : 'Chưa có kinh nghiệm') : (payload.experiences.length + (isEn ? ' position(s) declared' : ' đơn vị công tác'))}</span></div>
      </div>
    </div>

    <!-- 5: Hồ sơ đã đính kèm -->
    <div class="review-section">
      <div class="review-header">
        <h4>5. ${isEn ? 'Uploaded Documents' : 'Hồ sơ đã đính kèm'}</h4>
        <button type="button" class="btn-edit-jump" onclick="goToStep(7)">${isEn ? 'Edit' : 'Chỉnh sửa'}</button>
      </div>
      <div class="review-body">
        <div class="review-item col-span-2">
          <span class="review-value">
            ${Object.keys(APP_STATE.uploadedFilesData).length > 0 
              ? Object.values(APP_STATE.uploadedFilesData).map(f => `📄 ${f.docType}: <strong>${f.originalName}</strong> (${f.fileSize})`).join('<br>')
              : (isEn ? 'No files attached' : 'Chưa có hồ sơ nào được tải lên.')}
          </span>
        </div>
      </div>
    </div>
  `;
}

// ========================================================================
// SUBMISSION CONTROLLER
// ========================================================================
function openConfirmModal() {
  const isAgreed = document.getElementById('commitmentAgreeCheckbox').checked;
  if (!isAgreed) {
    showToast(APP_STATE.lang === 'en' ? 'Please agree with the commitment statements to proceed.' : 'Bạn bắt buộc phải tích chọn đồng ý với các cam kết để hoàn tất kê khai.', 'error');
    return;
  }
  document.getElementById('confirmModal').classList.add('show');
}

function closeConfirmModal() {
  document.getElementById('confirmModal').classList.remove('show');
}

async function proceedFinalSubmit() {
  closeConfirmModal();
  if (APP_STATE.isSubmitting) return;

  if (!GAS_API_URL || GAS_API_URL.includes('DÁN_LINK')) {
    showToast('Lỗi cấu hình: Chưa điền link Web App (GAS_API_URL)', 'error');
    return;
  }

  APP_STATE.isSubmitting = true;
  const submitBtn = document.getElementById('btnFinalSubmit');
  submitBtn.disabled = true;

  const isEn = (APP_STATE.lang === 'en');
  showLoading(
    isEn ? 'Uploading documents & recording data...' : 'Đang xử lý tải tệp và ghi nhận hồ sơ vào hệ thống...', 
    isEn ? 'This may take around 10 - 25 seconds' : 'Quá trình này có thể mất từ 10 - 25 giây'
  );

  const payload = collectFormData();

  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const res = await response.json();
    hideLoading();
    APP_STATE.isSubmitting = false;
    submitBtn.disabled = false;

    if (res && res.success) {
      clearLocalStorageDraft();
      document.getElementById('submissionIdBadge').textContent = (isEn ? 'Record ID: ' : 'Mã hồ sơ: ') + (res.submissionId || 'HR-SUCCESS');
      goToStep(10);
    } else {
      showToast((isEn ? 'Submission failed: ' : 'Không thể gửi hồ sơ: ') + (res ? res.message : 'Error'), 'error');
    }
  } catch (err) {
    hideLoading();
    APP_STATE.isSubmitting = false;
    submitBtn.disabled = false;
    showToast((isEn ? 'Server error: ' : 'Lỗi máy chủ nghiêm trọng: ') + err.toString(), 'error');
  }
}

// ========================================================================
// COLLECT FORM DATA (MAPPED TO 45 COLUMNS A:AS)
// ========================================================================
function collectFormData() {
  let finalGender = document.getElementById('gender').value;
  if (finalGender === 'Khác') {
    finalGender = document.getElementById('otherGender').value.trim() || 'Khác';
  }

  let finalMarital = document.getElementById('maritalStatus').value;
  if (finalMarital === 'Khác') {
    finalMarital = document.getElementById('otherMarital').value.trim() || 'Khác';
  }

  let finalNationality = document.getElementById('nationality').value;
  if (finalNationality === 'Khác') {
    finalNationality = document.getElementById('otherNationality').value.trim() || 'Khác';
  }

  let finalEthnicity = document.getElementById('ethnicity').value;
  if (finalEthnicity === 'Khác') {
    finalEthnicity = document.getElementById('otherEthnicity').value.trim() || 'Khác';
  }

  let finalReligion = document.getElementById('religion').value;
  if (finalReligion === 'Khác') {
    finalReligion = document.getElementById('otherReligion').value.trim() || 'Khác';
  }

  let finalIdCardType = document.getElementById('idCardType').value;
  if (finalIdCardType === 'Khác') {
    finalIdCardType = document.getElementById('otherIdCardType').value.trim() || 'Khác';
  }

  let finalIdIssuePlace = document.getElementById('idIssuePlace').value;
  if (finalIdIssuePlace === 'Khác') {
    finalIdIssuePlace = document.getElementById('otherIdIssuePlace').value.trim() || 'Khác';
  }

  let finalEduLevel = document.getElementById('educationLevel').value;
  if (finalEduLevel === 'Khác') {
    finalEduLevel = document.getElementById('otherEducationLevel').value.trim() || 'Khác';
  }

  // Gom địa chỉ chuẩn hóa (Sau sáp nhập)
  const fullPob = buildFullAddress(
    document.getElementById('pobDetail').value,
    document.getElementById('pobWard').value,
    document.getElementById('pobProvince').value
  );

  const fullPermAddress = buildFullAddress(
    document.getElementById('permDetail').value,
    document.getElementById('permWard').value,
    document.getElementById('permProvince').value
  );

  const fullCurrAddress = buildFullAddress(
    document.getElementById('currDetail').value,
    document.getElementById('currWard').value,
    document.getElementById('currProvince').value
  );

  const noExp = document.getElementById('noExpCheckbox').checked;
  const experiences = [];
  if (!noExp) {
    document.querySelectorAll('#experienceTableBody tr').forEach(tr => {
      const from = tr.querySelector('.exp-from').value.trim();
      const to = tr.querySelector('.exp-to').value.trim();
      const company = tr.querySelector('.exp-company').value.trim();
      const title = tr.querySelector('.exp-title').value.trim();
      const tasks = tr.querySelector('.exp-tasks').value.trim();
      if (from || to || company) {
        experiences.push({ from, to, company, title, tasks });
      }
    });
  }

  const family = [];
  document.querySelectorAll('#familyTableBody tr').forEach(tr => {
    const name = tr.querySelector('.fam-name').value.trim();
    const birthYear = tr.querySelector('.fam-year').value.trim();
    const relation = tr.querySelector('.fam-rel').value.trim();
    const job = tr.querySelector('.fam-job').value.trim();
    const workplace = tr.querySelector('.fam-workplace').value.trim();
    if (name || relation) {
      family.push({ name, birthYear, relation, job, workplace });
    }
  });

  const hasDependents = document.getElementById('hasDependents').value;
  const dependents = [];
  if (hasDependents === 'Có') {
    document.querySelectorAll('#dependentTableBody tr').forEach(tr => {
      const name = tr.querySelector('.dep-name').value.trim();
      const birthYear = tr.querySelector('.dep-year').value.trim();
      const relation = tr.querySelector('.dep-rel').value.trim();
      const mst = tr.querySelector('.dep-mst').value.trim();
      const effectiveDate = tr.querySelector('.dep-time').value.trim();
      if (name) {
        dependents.push({ name, birthYear, relation, mst, effectiveDate });
      }
    });
  }

  const emergencyContact = {
    relation: APP_STATE.emergencyContactPerson ? APP_STATE.emergencyContactPerson.relation : '',
    phone: document.getElementById('emergencyPhone').value.trim()
  };

  const uploadedFiles = Object.values(APP_STATE.uploadedFilesData);

  return {
    fullName: document.getElementById('fullName').value.trim(),
    gender: finalGender,
    dob: document.getElementById('dob').value,
    pob: fullPob, // Cột E
    maritalStatus: finalMarital,
    nationality: finalNationality,
    ethnicity: finalEthnicity,
    religion: finalReligion,
    idCardType: finalIdCardType,
    idNumber: document.getElementById('idNumber').value.trim(),
    idIssueDate: document.getElementById('idIssueDate').value,
    idExpiryDate: document.getElementById('idExpiryDate').value,
    idIssuePlace: finalIdIssuePlace,
    permanentAddress: fullPermAddress, // Cột O
    currentAddress: fullCurrAddress,   // Cột P
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),

    workBranch: '',
    workDepartment: '',
    startDate: '',
    jobTitle: '',
    workingType: document.getElementById('workingType').value,
    workingTime: document.getElementById('workingTime').value,
    contractType: '',

    educationLevel: finalEduLevel,
    school: document.getElementById('school').value.trim(),
    major: document.getElementById('major').value.trim(),
    gradYear: document.getElementById('gradYear').value.trim(),
    noExperience: noExp,
    experiences: experiences,
    eduCertificates: document.getElementById('eduCertificates').value.trim() || 'Không',
    eduExpYears: document.getElementById('eduExpYears').value.trim() || '0',
    livingAbroad: document.getElementById('livingAbroad').value.trim() || 'Không',
    taxId: document.getElementById('taxId').value.trim(),
    socialInsuranceId: document.getElementById('socialInsuranceId').value.trim(),
    healthCheckPlace: document.getElementById('healthCheckPlace').value.trim(),
    bidvAccount: document.getElementById('bidvAccount').value.trim(),
    otherBank: document.getElementById('otherBank').value.trim() || 'Không',
    vehicleInfo: document.getElementById('vehicleInfo').value.trim() || 'Không',
    family: family,
    emergencyContact: emergencyContact,
    hasDependents: hasDependents,
    dependents: dependents,
    uploadedFiles: uploadedFiles,
    commitment: document.getElementById('commitmentAgreeCheckbox').checked ? 'Đồng ý' : 'Đồng ý'
  };
}

// ========================================================================
// AUTO SAVE & RESTORE DRAFT
// ========================================================================
function saveDraftToLocalStorage() {
  if (APP_STATE.currentStep <= 0 || APP_STATE.currentStep >= 9) return;
  try {
    const draft = {
      step: APP_STATE.currentStep,
      fullName: document.getElementById('fullName').value,
      gender: document.getElementById('gender').value,
      otherGender: document.getElementById('otherGender').value,
      dob: document.getElementById('dob').value,

      // Địa chỉ nơi sinh
      pobProvince: document.getElementById('pobProvince').value,
      pobWard: document.getElementById('pobWard').value,
      pobDetail: document.getElementById('pobDetail').value,

      maritalStatus: document.getElementById('maritalStatus').value,
      otherMarital: document.getElementById('otherMarital').value,
      nationality: document.getElementById('nationality').value,
      otherNationality: document.getElementById('otherNationality').value,
      ethnicity: document.getElementById('ethnicity').value,
      otherEthnicity: document.getElementById('otherEthnicity').value,
      religion: document.getElementById('religion').value,
      otherReligion: document.getElementById('otherReligion').value,
      
      idCardType: document.getElementById('idCardType').value,
      otherIdCardType: document.getElementById('otherIdCardType').value,
      idNumber: document.getElementById('idNumber').value,
      idIssueDate: document.getElementById('idIssueDate').value,
      idExpiryDate: document.getElementById('idExpiryDate').value,
      idIssuePlace: document.getElementById('idIssuePlace').value,
      otherIdIssuePlace: document.getElementById('otherIdIssuePlace').value,
      
      // Thường trú & Hiện tại
      permProvince: document.getElementById('permProvince').value,
      permWard: document.getElementById('permWard').value,
      permDetail: document.getElementById('permDetail').value,

      currProvince: document.getElementById('currProvince').value,
      currWard: document.getElementById('currWard').value,
      currDetail: document.getElementById('currDetail').value,

      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      workingType: document.getElementById('workingType').value,
      workingTime: document.getElementById('workingTime').value,
      educationLevel: document.getElementById('educationLevel').value,
      otherEducationLevel: document.getElementById('otherEducationLevel').value,
      school: document.getElementById('school').value,
      major: document.getElementById('major').value,
      gradYear: document.getElementById('gradYear').value
    };
    localStorage.setItem('hr_onboarding_draft_v3', JSON.stringify(draft));
  } catch(e) {}
}

function checkAndPromptDraftModal() {
  try {
    const raw = localStorage.getItem('hr_onboarding_draft_v3');
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (draft && (draft.fullName || draft.step > 0)) {
      APP_STATE.pendingDraftData = draft;
      document.getElementById('draftFullNameSpan').textContent = draft.fullName || '(Chưa điền tên)';
      document.getElementById('draftStepSpan').textContent = `Bước ${draft.step || 1}/9`;
      document.getElementById('draftModal').classList.add('show');
    }
  } catch(e) {}
}

function applyAndResumeDraft() {
  const draft = APP_STATE.pendingDraftData;
  if (!draft) {
    document.getElementById('draftModal').classList.remove('show');
    return;
  }

  document.getElementById('fullName').value = draft.fullName || '';
  if (draft.gender) {
    document.getElementById('gender').value = draft.gender;
    handleDropdownWithCustom(document.getElementById('gender'), 'otherGenderGroup');
    if (draft.otherGender) document.getElementById('otherGender').value = draft.otherGender;
  }
  document.getElementById('dob').value = draft.dob || '';

  if (draft.maritalStatus) {
    document.getElementById('maritalStatus').value = draft.maritalStatus;
    handleDropdownWithCustom(document.getElementById('maritalStatus'), 'otherMaritalGroup');
    if (draft.otherMarital) document.getElementById('otherMarital').value = draft.otherMarital;
  }
  if (draft.nationality) {
    document.getElementById('nationality').value = draft.nationality;
    handleDropdownWithCustom(document.getElementById('nationality'), 'otherNationalityGroup');
    if (draft.otherNationality) document.getElementById('otherNationality').value = draft.otherNationality;
  }
  if (draft.ethnicity) {
    document.getElementById('ethnicity').value = draft.ethnicity;
    handleDropdownWithCustom(document.getElementById('ethnicity'), 'otherEthnicityGroup');
    if (draft.otherEthnicity) document.getElementById('otherEthnicity').value = draft.otherEthnicity;
  }
  if (draft.religion) {
    document.getElementById('religion').value = draft.religion;
    handleDropdownWithCustom(document.getElementById('religion'), 'otherReligionGroup');
    if (draft.otherReligion) document.getElementById('otherReligion').value = draft.otherReligion;
  }

  if (draft.idCardType) {
    document.getElementById('idCardType').value = draft.idCardType;
    handleDropdownWithCustom(document.getElementById('idCardType'), 'otherIdCardTypeGroup');
    if (draft.otherIdCardType) document.getElementById('otherIdCardType').value = draft.otherIdCardType;
  }
  document.getElementById('idNumber').value = draft.idNumber || '';
  document.getElementById('idIssueDate').value = draft.idIssueDate || '';
  document.getElementById('idExpiryDate').value = draft.idExpiryDate || '';
  if (draft.idIssuePlace) {
    document.getElementById('idIssuePlace').value = draft.idIssuePlace;
    handleDropdownWithCustom(document.getElementById('idIssuePlace'), 'otherIdIssuePlaceGroup');
    if (draft.otherIdIssuePlace) document.getElementById('otherIdIssuePlace').value = draft.otherIdIssuePlace;
  }

  restoreDraftAddressFields(draft);

  document.getElementById('phone').value = draft.phone || '';
  document.getElementById('email').value = draft.email || '';

  if (draft.workingType) document.getElementById('workingType').value = draft.workingType;
  if (draft.workingTime) document.getElementById('workingTime').value = draft.workingTime;

  if (draft.educationLevel) {
    document.getElementById('educationLevel').value = draft.educationLevel;
    handleDropdownWithCustom(document.getElementById('educationLevel'), 'otherEducationLevelGroup');
    if (draft.otherEducationLevel) document.getElementById('otherEducationLevel').value = draft.otherEducationLevel;
  }
  document.getElementById('school').value = draft.school || '';
  document.getElementById('major').value = draft.major || '';
  document.getElementById('gradYear').value = draft.gradYear || '';

  document.getElementById('draftModal').classList.remove('show');
  goToStep(draft.step || 1);
  showToast('Đã khôi phục thành công bản kê khai!', 'success');
}

function restoreDraftAddressFields(draft) {
  if (!draft) return;

  const restoreGroup = (prefix, provVal, wardVal, detailVal) => {
    const provSelect = document.getElementById(prefix + 'Province');
    const wardSelect = document.getElementById(prefix + 'Ward');
    const detailInput = document.getElementById(prefix + 'Detail');

    if (detailInput && detailVal !== undefined) detailInput.value = detailVal;

    if (provSelect && provVal) {
      provSelect.value = provVal;
      onProvinceChange(prefix);
      if (wardSelect && wardVal) {
        wardSelect.value = wardVal;
      }
    }
  };

  restoreGroup('pob', draft.pobProvince, draft.pobWard, draft.pobDetail);
  restoreGroup('perm', draft.permProvince, draft.permWard, draft.permDetail);
  restoreGroup('curr', draft.currProvince, draft.currWard, draft.currDetail);
}

function discardDraftAndStartNew() {
  clearLocalStorageDraft();
  APP_STATE.pendingDraftData = null;
  document.getElementById('draftModal').classList.remove('show');
  showToast('Đã xóa bản nháp cũ. Bắt đầu phiên làm mới!', 'info');
}

function clearLocalStorageDraft() {
  try {
    localStorage.removeItem('hr_onboarding_draft_v3');
  } catch(e) {}
}

// ========================================================================
// UI UTILITIES (TOAST & LOADING)
// ========================================================================
function showLoading(mainText, subText = 'Vui lòng không đóng trình duyệt') {
  document.getElementById('loadingMainText').textContent = mainText;
  document.getElementById('loadingSubText').textContent = subText;
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
