"use client"
import styles from './filtering.module.css'
import MultiRangeSlider from '../multiRange/MultiRangeSlider';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Card from '../bestProducts/Card';
const Filtering = () => {
    const [minValue, setMinValue] = useState()
    const [maxValue, setMaxValue] = useState()

    const priceFilterHandler = () => {
        alert(maxValue)
    }
    return (
        <div className={styles.filtering}>
             
            <div className={styles.name_filtering}>
                <p className={styles.title}>انتخاب قهوه بر اساس</p>
                <section>
                    <div className={styles.active}>
                        <p>مرتب‌سازی بر اساس محبوبیت</p>
                    </div>

                    <div className={styles.active}>
                        <p>مرتب‌سازی بر اساس امتیاز</p>
                    </div>


                    <div className={styles.active}>
                        <p>مرتب‌سازی بر اساس آخرین</p>
                    </div>


                    <div className={styles.active}>
                        <p>مرتب‌سازی بر اساس ارزانترین</p>
                    </div>
                   
                    <div className={styles.active}>
                        <p>مرتب‌سازی بر اساس گرانترین</p>
                    </div>
                </section>
            </div>
            <div className={styles.star_filtering}>
                <p className={styles.title}>انتخاب بر اساس امتیاز</p>
                <section>
                    <div>
                        <div>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <span>(12)</span>
                    </div>
                    <div>
                        <div>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </div>
                        <span>(22)</span>
                    </div>
                </section>
            </div>

            
        </div>
    )
}

export default Filtering
