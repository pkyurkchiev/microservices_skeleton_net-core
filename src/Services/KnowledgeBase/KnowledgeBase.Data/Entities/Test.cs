﻿using System;
using System.Collections.Generic;

namespace KnowledgeBase.Data.Entities
{
    public class Test : BaseEntity
    {
        #region Properties

        public string Description { get; set; }
        public bool IsFinish { get; set; }
        public DateTime? FinishedOn { get; set; }

        public ICollection<UserTest> UserTests { get; set; }
        public ICollection<TestDetail> TestDetails { get; set; }

        #endregion
    }
}
